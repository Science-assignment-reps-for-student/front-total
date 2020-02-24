import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../public/Header';
import * as S from './style/ChattingStyle';
import { enter } from './img';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { getChattingURL, socketURL } from '../resource/serverURL';
import { reparseDate, isDayOver } from '../resource/publicFunction';
import { useParams } from 'react-router-dom';

const Chatting = ({ state, actions }) => {
    const { accessToken, refreshToken }  = state;
    const header = {
        headers: {
            "Authorization": accessToken,
        }
    }
    const { userId } = useParams();
    const [inputValue, valueChange] = useState("");
    const [stomp, stompChange] = useState();
    const [message, messageChange] = useState([]);
    const [buffer, bufferChange] = useState();
    const [isLoaded, loadChange] = useState(false);
    const endPoint = useRef();
    const input = useRef();

    
    useEffect(()=> {
        getChatting()
        .then((e)=> {   
            setSocketConnect(e);
        })
    },[]);

    useEffect(()=> {
        if(buffer){
            messageChange([...message,buffer]);
        }
    },[buffer]);

    useEffect(()=> {
        if(message.length > 0){
            endPoint.current.scrollIntoView();
        }
    },[message]);

    const setSocketConnect = (e) => {
        const socket = new SockJS(socketURL);
        const stomp = Stomp.over(socket);
        stompChange(stomp);
        const messageBuffer = e.data;
        messageChange(messageBuffer);
        stomp.connect({},()=> {
            getSubscribe(stomp);
            loadChange(true);
        });
    }

    const getChatting = () => new Promise((resolve,reject)=> {
        axios.get(`${getChattingURL}/${userId}`,header)
        .then((e) => {
            resolve(e);
        })
        .catch((e)=> {
            try{
                if(e.response.status){
                    
                } else {

                }
            } catch {
                alert("네트워크를 확인해 주세요.");
            }
            reject(e);
        })
    })


    const getSubscribe = (stomp) => {
        return stomp.subscribe(`/receive/${userId}`, function(msg) {
            const data = msg.body;  
            const parsedData = JSON.parse(data);
            bufferChange(parsedData);
        });
    }

    const setMessage = () => {
        let buffer = [];
        let count = 0;
        message.map((data)=> {
            const { messageType, messageTime, message } = data;
            buffer.push(
                <S.ChattingTalk type={messageType} key={count}>
                    <div>
                        {messageType ? "" : "1212오준상"}
                        <S.ChattingBubble type={messageType}>{message}</S.ChattingBubble>
                        <span>{isDayOver(messageTime)}</span>
                    </div>
                </S.ChattingTalk>
            );
            count++;
            return data;
        })
        return buffer;
    }

    const sendMessage = () => {
        if(inputValue.length <= 0){
            return;
        } else {
            const data = {
                "token": state.accessToken,
                "message": inputValue,
            };  
            const stringedData = JSON.stringify(data);
            stomp.send(`/send/${userId}`,{}, stringedData);
            valueChange("");
        }
    };

    const enterHandler = (e) => {
        const message = e.target.value;
        valueChange(message);
    }

    const keyPressHandler = (e) => {
        if(e.key === "Enter"){
            sendMessage();
        }
    }

    return (
        <>
            <Header/>
            <S.ChattingMain>
                <S.ChattingSubHeader>1212 오준상</S.ChattingSubHeader>
                <div className="wrapper">
                    <div>
                        {setMessage()}
                        <div ref={endPoint}/>
                    </div>
                </div>
                <S.ChattingType>
                    <S.ChattingTypeInput>
                        <input type="text" value={inputValue} onChange={enterHandler} onKeyPress={keyPressHandler}/>
                        <img src={enter} alt="enter" onClick={sendMessage}/>
                    </S.ChattingTypeInput>
                </S.ChattingType>
            </S.ChattingMain>
        </>
    )
}

export default Chatting;