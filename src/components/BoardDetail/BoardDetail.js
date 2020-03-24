import React from 'react';
import * as S from './style/BoardDetailStyle';
import { BoardTop, BoardComments } from './components';
import { Header } from '../Header';

const BoardDetail = () => {
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

export default BoardDetail;