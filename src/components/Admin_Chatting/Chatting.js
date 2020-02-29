import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../public/Header';
import * as S from './style/ChattingStyle';
import { enter } from './img';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { messageURL, socketURL, refreshAccessTokenURL, getUserInfoURL } from '../resource/serverURL';
import { isDayOver, getIsExpiration, refreshAccessToken } from '../resource/publicFunction';
import { useParams } from 'react-router-dom';
import { ChattingBubble } from './components'

let isOut = false;

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
    const [socket, socketChange] = useState();
    const [message, messageChange] = useState([]);
    const [buffer, bufferChange] = useState();
    const [isLoaded, loadChange] = useState(false);
    const [userData, userDataChange] = useState();
    const endPoint = useRef();

    
    useEffect(()=> {
        isOut = false;
        getUserInfo()
        .then(()=> {
            getChatting()
            .then((e)=> {   
                return setSocketConnect(e);
            })
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

    useEffect(()=> {
        if(socket){
            return ()=> {
                isOut = true;
                socket.close();
            }
        }
    },[socket])

    useEffect(()=> {
        if(stomp){
            return ()=> {
                isOut = true;
                stomp.disconnect();
            }
        }
    },[stomp])

    const setSocketConnect = (e) => {
        const socket = new SockJS(socketURL);
        const stomp = Stomp.over(socket);
        stompChange(stomp);
        socketChange(socket);
        try {
            const messageBuffer = e.data;
            messageChange(messageBuffer);
        } catch {

        }
        stomp.connect(
            {},
            {},
            ()=> {
                getSubscribe(stomp);
                loadChange(true);
            },
            ()=> {},//error
            ()=> {//close
                if(!isOut){
                    setSocketConnect();
                }
            }
            );
    }

    const getChatting = () => new Promise((resolve,reject)=> {
        axios.get(`${messageURL}/${userId}`,header)
        .then((e) => {
            resolve(e);
        })
        .catch((e)=> {
            getIsExpiration(e) 
            ? refreshAccessToken(refreshToken,actions,refreshAccessTokenURL) 
            : alert("네트워크를 확인해 주세요.");
            reject(e);
        })
    })

    const getUserInfo = () => new Promise((resolve,reject) => {
        axios.get(`${getUserInfoURL}/${userId}`, header)
        .then((e)=> {
            const data = e.data;
            userDataChange(data);
            resolve(data);
        })
    })

    const getSubscribe = (stomp) => {
        return stomp.subscribe(`/receive/${userId}`, function(msg) {
            const data = msg.body;
            const parsedData = JSON.parse(data);
            const messageId = parsedData.messageId;
            readMessage(messageId);
            bufferChange(parsedData);
        });
    }

    const readMessage = (messageId) => {
        axios.post(`${messageURL}/${messageId}`,{},header)
        .catch((e)=> {
            getIsExpiration(e) 
            ? refreshAccessToken(refreshToken,actions,refreshAccessTokenURL) 
            : alert("네트워크를 확인해 주세요.");
        })
    }

    const setMessage = () => {
        let buffer = [];
        let count = 0;
        message.map((data)=> {
            const { messageType, messageTime, message } = data;
            buffer.push(
                <ChattingBubble messageType={messageType} count={count} message={message} userData={userData} messageTime={messageTime}/>
            );
            count++;
            return data;
        })
        return buffer;
    }

    const sendMessage = () => {
        if(inputValue.length <= 0 || !isLoaded){
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
                <S.ChattingSubHeader>{userData ? `${userData.userNumber} ${userData.userName}` : "로딩중..."}</S.ChattingSubHeader>
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