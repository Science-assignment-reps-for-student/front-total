import React, { useState, useEffect } from 'react';
import * as S from '../style/PublicStyle';
import HeaderButton from './HeaderButton';
import { AccessTokenConsumer } from '../../../context/AccessTokenContext';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { socketURL } from '../../resource/serverURL';
import { getHasAlarm } from '../../resource/publicFunction';

const Header = ({ state, actions, isHeader }) => {

    const [socket, socketChange] = useState();
    const [stomp, stompChange] = useState();
    const [isAlarm, alarmChange] = useState(false);
    const [isOut, outChange] = useState(false);
    const [isCheck, checkChange] = useState(false);
    const { accessToken, refreshToken } = state;

    const header = {
        headers: {
            "Authorization": accessToken,
        }
    }


    useEffect(()=> {
        if(!isHeader){
            getHasAlarm(header)
            .then((e)=> {
                getNotificationPermission();
                checkChange(e);
                setSocket();
            })
            .catch(()=> {
    
            })
        }
    },[])

    useEffect(()=> {
        if(socket){
            return () => {
                outChange(true);
            };
        }
    },[socket,stomp])

    useEffect(()=> {
        if(isOut){
            socket.close();
            stomp.disconnect();
        }
    },[isOut])

    useEffect(()=> {
        if(isAlarm){
            const { userName, message } = isAlarm;
            const alarm = new Notification(userName, {body: message});
            checkChange(true);
            alarm.show = () => {
                setTimeout(alarm.close, 5000);
            }
            alarm.click = () => {
                alarm.close();
            }
        }
    },[isAlarm])

    const getNotificationPermission = () => {
        if (!("Notification" in window)) {
            alert("데스크톱 알림을 지원하지 않는 브라우저입니다.");
        }
        Notification.requestPermission(function (result) {
            if(result === 'denied') {
                alert('알림을 차단하셨습니다.\n브라우저의 사이트 설정에서 변경하실 수 있습니다.');
                return false;
            }
        });
    }

    const setSocket = () => {
        const socket = new SockJS(socketURL);
        const stomp = Stomp.over(socket);
        stompChange(stomp);
        socketChange(socket);
        stomp.connect(
            {},
            {},
            ()=> {// success
                getSubscribe(stomp);
            },
            ()=> {},//error
            ()=> {//close
                setTimeout(()=> {
                    if(!isOut){
                        setSocket();
                    }
                },5000);
            }
        );
    }

    const getSubscribe = (stomp) => {
        return stomp.subscribe(`/receive/admin`, function(msg) {
            const data = msg.body;
            const parsedData = JSON.parse(data);
            alarmChange(parsedData);
        });
    }

    return (
        <S.Header>
            <div>
                <p id="title"><span>SCARFS </span>Admin console</p>
                <div>
                    <AccessTokenConsumer>
                        {
                            ({actions})=> {
                                return (
                                    <>
                                        <HeaderButton page="main" actions={actions}>제출현황</HeaderButton>
                                        <HeaderButton page="make" actions={actions}>과제생성</HeaderButton>
                                        <HeaderButton isCheck={isCheck} page="qna" actions={actions}>QnA</HeaderButton>
                                    </>
                                )
                            }
                        }
                    </AccessTokenConsumer>
                </div>
            </div>
            <div>
                <div id="logOut">
                    <AccessTokenConsumer>
                        {
                            ({actions}) => <HeaderButton page="logout" actions={actions}>로그아웃</HeaderButton>
                        }
                    </AccessTokenConsumer>
                </div>
            </div>
        </S.Header>
    )
}

export default Header;