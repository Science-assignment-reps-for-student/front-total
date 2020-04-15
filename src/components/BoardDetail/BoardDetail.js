import React, { useEffect, useState } from 'react';
import * as S from './style/BoardDetailStyle';
import { BoardTop, BoardComments } from './components';
import { Header } from '../Header';
import { withRouter, useParams } from 'react-router-dom';
import { errorTypeCheck } from '../resource/publicFunction';
import Axios from 'axios';


const BoardDetail = ({ state, getUserInfo, history, taskActions }) => {
    const [userInfo, userInfoChange] = useState({});
    const [boardInfo, boardInfoChange] = useState({});
    const { limServer, wooServer, accessToken, refreshToken } = state;
    const { number } = useParams();
    useEffect(()=> {
        const userInfoPro = getUserInfo(limServer,accessToken);
        userInfoPro.
        then((response)=> {
            const data = response.data;
            userInfoChange(data);
            setBoardInfo(number);
        })
        .catch((err)=> {
            errorTypeCheck(err,refreshToken,taskActions,history);
        })
    },[]);
    const getBoardInfo = (number) => 
    new Promise((resolve,reject)=>{
        const header = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        Axios.get(`${wooServer}/board/${number}`,header)
        .then((data)=> {
            resolve(data)
        })
        .catch((err)=> {
            reject(err);
        })
    });
    const setBoardInfo = (number) => {
        getBoardInfo(number)
        .then((response)=> {
            const data = response.data;
            data.created_at = data.created_at.split("T")[0];// 시간 이상하게 나오는거 일시적인 처리
            boardInfoChange(data);
        })
    }
    const gofixBoardPage = (id) => {
        history.push(`/write/${id}`)
    }
    const deleteBoard = (id) => {
        const isDelete = window.confirm("정말로 삭제하시겠습니까?");
        if(isDelete){
            const header = {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
            Axios.delete(`${wooServer}/board/${id}`,header)
            .then(()=> {
                history.push('/board');
            })
            .catch((err)=> {
                console.log(err)
                alert('권한이 없습니다.')
            })
        }
    }
    return (
        <>
            <Header/>
            <S.Task>
                <div className="wrapper">
                    <BoardTop 
                        title={boardInfo.title} 
                        description={boardInfo.description} 
                        name={boardInfo.writer} 
                        created_at={boardInfo.created_at}
                        board_id={boardInfo.board_id}
                        fixClickHandler={gofixBoardPage}
                        deleteClickHandler={deleteBoard}
                    />
                    <BoardComments/>
                </div>
            </S.Task>
        </>
    )
}

export default withRouter(BoardDetail);