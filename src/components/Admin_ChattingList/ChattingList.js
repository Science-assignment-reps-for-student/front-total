import React, { useEffect, useState, useCallback } from 'react';
import * as S from './style/ChattingListStyle';
import { Header } from '../public/Header';
import { BackgroundWhite } from '../public/Background';
import { ListComponent } from './components';
import axios from 'axios';
import { messageURL, getUserInfoURL } from '../resource/serverURL';
import { isDayOver, errorTypeCheck, getUserInfo, getSubscribe } from '../resource/publicFunction';
import { withRouter } from 'react-router-dom'; 

const ChattingList = ({ actions, state, history, stomp }) => {
    const { accessToken, refreshToken } = state;
    const [messageList, _listChange] = useState([]);
    const [page, _pageChange] = useState(0);
    const [isSubscribe, _subscribeChange] = useState(false); 
    const header = {
        headers: {
            "Authorization": accessToken,
        },
    };

    const listChange = useCallback((e)=> {
        _listChange(e);
    },[])

    const pageChange = useCallback((e)=> {
        _pageChange(e);
    },[])

    const subscribeChange = useCallback((e)=> {
        _subscribeChange(e);
    },[])


    useEffect(()=> {
        const isAdmin = getUserInfo(getUserInfoURL,accessToken);
        isAdmin
        .then((userType)=> {
            if(!userType){
                history.push('/admin/Login');
            } else {
                axios.get(messageURL,header)
                .then((e)=> {
                    const messageList = e.data;
                    listChange(messageList);
                })
                .catch((err)=> {
                    errorTypeCheck(err,refreshToken,actions,history)
                })
            }
        })
        .catch((e)=> {
            history.push('/admin/Login');
        })
    },[]);

    useEffect(()=> {
        getSubscribe(stomp,subscribeChange);
        if(stomp && isSubscribe){
            return ()=> {
                stomp.unsubscribe();
            }
        }
    },[stomp])

    const setMessageList = () => {
        const buffer = [];
        for(let i = page * 7;i < page * 7 + 7;i++){
            if(messageList[i]){
                const {
                    message,
                    messageTime,
                    show,
                    userId,
                    userName,
                    userNumber
                } = messageList[i];
                buffer.push(<ListComponent name={userName} number={userNumber} userId={userId} isNew={!show} text={message} date={isDayOver(messageTime)}/>)
            } else {
                break;
            }
        }
        return buffer;
    }

    const getButtonNumber = (messageList, count) => {
        return count <= Math.ceil(messageList.length / 7);
    }   

    const setButton = () => {
        let buffer = [];
        for(let i=1; getButtonNumber(messageList, i); i++){
            buffer.push(<div onClick={()=> {pageChange(i-1)}}>{i}</div>)
        }
        return buffer;
    }

    const isEmpty = (array) => {
        if(array.length > 0){
            return false;
        } else {
            return true;
        }
    }

    return (
        <>
            <Header actions={actions} state={state}/>
            <BackgroundWhite img={true}/>
            <S.ChattingListBackground>
                <h2>Q&A</h2>
                <hr/>
                <div className="wrapper">
                    <S.ChattingListBody>
                        <div>
                            <ListComponent name="이름" number="학번" date="최근 날짜" text="최근 대화" isHeader={true}/>
                            {!isEmpty(messageList) ? setMessageList() : "" }
                        </div>  
                    </S.ChattingListBody>
                </div>
                <S.ChattingListButton>
                    {setButton()}
                </S.ChattingListButton>
            </S.ChattingListBackground>
        </>
    )
}

export default withRouter(ChattingList);