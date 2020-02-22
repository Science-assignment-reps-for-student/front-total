import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../public/Header';
import * as S from './style/ChattingStyle';
import { enter } from './img';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { getChattingURL, socketURL } from '../resource/serverURL';
import { reparseDate } from '../resource/publicFunction';

const Chatting = ({ state, actions }) => {

    const userId = 18;
    const { accessToken, refreshToken }  = state;
    const header = {
        headers: {
            "Authorization": accessToken,
        }
    }
    const [inputValue, valueChange] = useState("");
    const [stomp, stompChange] = useState();
    const [message, messageChange] = useState([]);
    const [buffer, bufferChange] = useState();
    const scrollDiv = useRef();
    const endPoint = useRef();

    
    useEffect(()=> {
        axios.get(`${getChattingURL}/${userId}`,header)
        .then((e)=> {   
            const messageBuffer = e.data;
            const socket = new SockJS(socketURL);
            const stomp = Stomp.over(socket);
            messageChange(messageBuffer);
            stompChange(stomp);
            stomp.connect({},()=> {getSubscribe(stomp)});
        })
        .catch((e)=> {
            try{
                if(e.response.status){
                    
                } else {

                }
            } catch {
                alert("네트워크를 확인해 주세요.");
            }
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
    },[message])


    const getSubscribe = (stomp) => {
        return stomp.subscribe(`/receive/${userId}`, function(msg) {
            const data = msg.body;  
            const parsedData = JSON.parse(data)
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
                        <span>{reparseDate(messageTime)}</span>
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
                "message": inputValue
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
                <div ref={scrollDiv} className="wrapper">
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