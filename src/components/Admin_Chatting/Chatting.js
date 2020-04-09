import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from '../public/Header';
import * as S from './style/ChattingStyle';
import { enter } from './img';
import axios from 'axios';
import { messageURL, getUserInfoURL } from '../resource/serverURL';
import { getUserInfo, errorTypeCheck } from '../resource/publicFunction';
import { useParams } from 'react-router-dom';
import { ChattingBubble } from './components';
import { withRouter } from 'react-router-dom'

const Chatting = ({ state, actions, history, stomp }) => {
    
    const { accessToken, refreshToken }  = state;
    const header = {
        headers: {
            "Authorization": accessToken,
        }
    }
    const { userId } = useParams();
    const [inputValue, _valueChange] = useState("");
    const [message, _messageChange] = useState([]);
    const [buffer, _bufferChange] = useState();
    const [isLoaded, _loadChange] = useState(false);
    const [userData, _userDataChange] = useState();
    const [isError, _errorChange] = useState(true);
    const [isSubscribe, _subscribeChange] = useState(false);
    const endPoint = useRef();

    const valueChange = useCallback((e)=> {
        _valueChange(e);
    },[])
    const messageChange = useCallback((e)=> {
        _messageChange(e);
    },[])
    const bufferChange = useCallback((e)=> {
        _bufferChange(e);
    },[])
    const loadChange = useCallback((e)=> {
        _loadChange(e);
    },[])
    const userDataChange = useCallback((e) => {
        _userDataChange(e);
    },[])
    const errorChange = useCallback((e)=> {
        _errorChange(e);
    },[])
    const subscribeChange = useCallback((e) => {
        _subscribeChange(e);
    },[])
    
    useEffect(()=> {
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
                        const messageData =  e.data
                        messageChange(messageData);
                    })
                    .catch((e)=> {
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
        if(isEmpty(message)){
            endPoint.current.scrollIntoView();
        }
    },[message]);
    useEffect(()=> {
        getSubscribe();
        if(stomp && isSubscribe){
            return ()=> {
                stomp.unsubscribe();
            }
        }
    },[stomp])

    const getChatting = () => new Promise((resolve,reject)=> {
        axios.get(`${messageURL}/${userId}`,header)
        .then((e) => {
            resolve(e);
        })
        .catch((e)=> {
            errorTypeCheck(e,refreshToken,actions,history)
            reject(e);
        })
    })

    const getSubscribe = () => {
        if(stomp){
            const socketReadyState = stomp.webSocket.readyState;
            if(socketReadyState){
                setSubscribe();
                subscribeChange(true);
            } else {
                stomp.onConnect = () => {
                    setSubscribe();
                    subscribeChange(true);
                }
            }
        }
    }

    const isEmpty = (array) => {
        if(array.length > 0){
            return true;
        } else {
            return false;
        }
    }

    const setSubscribe = () => {
        stomp.subscribe(`/receive/${userId}`, (msg) => {
            const messageData = msg.body;
            const parsedData = JSON.parse(messageData);
            const messageId = parsedData.messageId;
            readMessage(messageId);
            bufferChange(parsedData);
        });
        errorChange(false);
        loadChange(true);   
    }

    const readMessage = (messageId) => {
        axios.post(`${messageURL}/${messageId}`,{},header)
        .catch((e)=> {
            errorTypeCheck(e,refreshToken,actions,history)
        })
    }

    const setMessage = () => {
        let buffer = [];
        let count = 0;
        message.map((messageData)=> {
            const { messageType, messageTime, message } = messageData;
            buffer.push(
                <ChattingBubble messageType={messageType} message={message} userData={userData} messageTime={messageTime} key={count}/>
            );
            count++;
            return messageData;
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
        if(!isEmpty(inputValue) || !isLoaded){
            return;
        } else {
            const messageData = {
                "token": state.accessToken,
                "message": inputValue,
            };  
            const stringedData = JSON.stringify(messageData);
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