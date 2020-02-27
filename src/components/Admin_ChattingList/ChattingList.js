import React, { useEffect, useState } from 'react';
import * as S from './style/ChattingListStyle';
import { Header } from '../public/Header';
import { BackgroundWhite } from '../public/Background';
import { ListComponent } from './components';
import axios from 'axios';
import { messageURL, refreshAccessTokenURL } from '../resource/serverURL';
import { isDayOver, getIsExpiration, refreshAccessToken } from '../resource/publicFunction';

const ChattingList = ({ actions, state }) => {
    const { accessToken, refreshToken } = state;
    const [messageList, listChange] = useState([]);
    const [page, pageChange] = useState(0)
    const header = {
        headers: {
            "Authorization": accessToken,
        },
    };

    useEffect(()=> {
        axios.get(messageURL,header)
        .then((e)=> {
            const list = e.data;
            listChange(list);
        })
        .catch((e)=> {
            getIsExpiration(e) 
            ? refreshAccessToken(refreshToken,actions,refreshAccessTokenURL) 
            : alert("네트워크를 확인해 주세요.");
        })
    },[]);

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

    const setButton = () => {
        let buffer = [];
        for(let i=1; i <= Math.ceil(messageList.length / 7); i++){
            buffer.push(<div onClick={()=> {pageChange(i-1)}}>{i}</div>)
        }
        return buffer;
    }

    return (
        <>
            <Header/>
            <BackgroundWhite img={true}/>
            <S.ChattingListBackground>
                <h2>Q&A</h2>
                <hr/>
                <div className="wrapper">
                    <S.ChattingListBody>
                        <h1>Q&A</h1>
                        <div>
                            <ListComponent name="이름" number="학번" date="최근 날짜" text="최근 대화" isHeader={true}/>
                            {messageList.length >= 1 ? setMessageList() : "" }
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

export default ChattingList;