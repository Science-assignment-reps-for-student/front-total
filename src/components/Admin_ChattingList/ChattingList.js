import React from 'react';
import * as S from './style/ChattingListStyle';
import { Header } from '../public/Header';
import { BackgroundWhite } from '../public/Background';
import { ListComponent } from './components';
import axios from 'axios';
import { getUserURL } from '../resource/serverURL';

const ChattingList = ({ actions, state }) => {
    const { accessToken, refreshToken } = state;
    const header = {
        headers: {
            "Authorization": accessToken,
        },
    };

    axios.get(`${getUserURL}?query=''`,header)
    .then((e)=> {
        console.log(e);
    });

    return (
        <>
            <Header/>
            <BackgroundWhite img={true}/>
            <S.ChattingListBackground>
                <h2>Q&A</h2>
                <hr/>
                <div>
                    <S.ChattingListBody>
                        <h1>Q&A</h1>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <th className="new"/>
                                        <th className="number">학번</th>
                                        <th className="name">이름</th>
                                        <th className="message">메세지</th>
                                        <th className="date">최근 날짜</th>
                                    </tr>
                                    <ListComponent isNew={true} number={1212} name="오준상" text="안녕" date="2020-02-22"/>
                                    <ListComponent number={1212} name="오준상" text="안녕" date="2020-02-22"/>
                                    <ListComponent number={1212} name="오준상" text="안녕" date="2020-02-22"/>
                                    <ListComponent number={1212} name="오준상" text="안녕" date="2020-02-22"/>
                                    <ListComponent number={1212} name="오준상" text="안녕" date="2020-02-22"/>
                                    <ListComponent number={1212} name="오준상" text="안녕" date="2020-02-22"/>
                                    <ListComponent number={1212} name="오준상" text="안녕" date="2020-02-22"/>
                                    <ListComponent number={1212} name="오준상" text="안녕" date="2020-02-22"/>
                                    <ListComponent number={1212} name="오준상" text="안녕" date="2020-02-22"/>
                                    <ListComponent number={1212} name="오준상" text="안녕" date="2020-02-22"/>
                                    <ListComponent number={1212} name="오준상" text="안녕" date="2020-02-22"/>
                                    <ListComponent number={1212} name="오준상" text="안녕" date="2020-02-22"/>
                                </tbody>
                            </table>
                        </div>
                    </S.ChattingListBody>
                </div>
            </S.ChattingListBackground>
        </>
    )
}

export default ChattingList;