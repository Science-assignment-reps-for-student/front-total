import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../public/Header';
import * as S from './style/ChattingStyle';
import { enter } from './img';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { messageURL, socketURL, refreshAccessTokenURL, getUserInfoURL } from '../resource/serverURL';
import { getIsExpiration, refreshAccessToken, getUserInfo } from '../resource/publicFunction';
import { useParams } from 'react-router-dom';
import { ChattingBubble } from './components';
import { withRouter } from 'react-router-dom'

let isOut = false;

const Chatting = ({ state, actions, history }) => {
    
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
    const [isError, errorChange] = useState(false);
    const endPoint = useRef();

    
    useEffect(()=> {
        isOut = false;
        const isAdmin = getUserInfo(getUserInfoURL,accessToken);
        isAdmin
        .then((userType)=> {
            getUserData()
            .then(()=> {
                if(!userType){
                    history.push('/admin/Login');
                } else {
                    getChatting()
                    .then((e)=> {    
                    const data =  e.data
                    messageChange(data);
                        return setSocketConnect(data);
                    })
                    .catch(()=> {
                        history.push('/admin/Login');
                    })
                }
            })
        })
        .catch(()=> {
            history.push('/admin/Login');
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
        stomp.connect(
            {},
            {},
            ()=> {
                getSubscribe(stomp);
                loadChange(true);
            },
            (e)=> {
                console.log(e);
            },//error
            ()=> {//close
                if(!isOut){
                    setSocketConnect(e);
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
                <ChattingBubble messageType={messageType} message={message} userData={userData} messageTime={messageTime} key={count}/>
            );
            count++;
            return data;
        })
        return buffer;
    }

    const getUserData = () => new Promise((resolve,reject)=> {
        axios.get(`${getUserInfoURL}/${userId}`,header)
        .then((e)=> {
            const userData = e.data;
            userDataChange(userData);
            resolve(userData);
        })
    })

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
            <Header state={state} actions={actions} isHeader={true}/>
            <S.ChattingMain error={isError}>
                <S.ChattingSubHeader>{userData ? `${userData.userNumber} ${userData.userName}` : "로딩중..."}</S.ChattingSubHeader>
                <div className="error">채팅 서버와 연결되지 않았습니다</div>
                <div className="wrapper">
                    <div>
                        {setMessage()}
                        <div ref={endPoint}/>
                    </div>
                </div>
                <S.ChattingType>
                    <S.ChattingTypeInput>
                        <input type="text" value={inputValue} onChange={enterHandler} onKeyPress={keyPressHandler} autoFocus/>
                        <img src={enter} alt="enter" onClick={sendMessage}/>
                    </S.ChattingTypeInput>
                </S.ChattingType>
            </S.ChattingMain>
        </>
    )
}

export default withRouter(Chatting);