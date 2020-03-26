import React, { useEffect } from 'react';
import * as S from './style/BoardDetailStyle';
import { BoardTop, BoardComments } from './components';
import { Header } from '../Header';
import { withRouter } from 'react-router-dom'

const BoardDetail = ({ state, getUserInfo, history }) => {
    const { limServer, wooServer, accessToken, refreshToken } = state;
    useEffect(()=> {
        const userInfoPro = getUserInfo(limServer,accessToken);
        if(!userInfoPro){ history.push('/'); }
    },[])
    return (
        <>
            <Header/>
                <S.Task>
                    <div className="wrapper">
                        <BoardTop/>
                        <BoardComments/>
                    </div>
                </S.Task>
        </>
    )
}

export default withRouter(BoardDetail);