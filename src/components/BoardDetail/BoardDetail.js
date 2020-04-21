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
    const [comment, commentChange] = useState([]);
    const { limServer, wooServer, accessToken, refreshToken } = state;
    const { number } = useParams();
    useEffect(()=> {
        const userInfoPro = getUserInfo(limServer,accessToken);
        if(userInfoPro){
            userInfoPro
            .then((response)=> {
                const data = response.data;
                userInfoChange(data);
                setBoardInfo(number);
                setComments(number);
            })
            .catch((err)=> {
                errorTypeCheck(err,refreshToken,taskActions,history);
            })
        } else {
            history.push('/');
        }
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
        .catch((err)=> {
            errorTypeCheck(err,refreshToken,taskActions,history);
            history.push('/board');
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
                alert('오류가 발생했습니다. 다시 시도해 주세요.')
            })
        }
    }
    const getComments = (id) => 
    new Promise((resolve,reject) =>{
        const header = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        Axios.get(`${wooServer}/comment/${id}`,header)
        .then((response)=> {
            const data = response.data;
            resolve(data);
        })
        .catch((err)=> {
            reject(err);
        })
    })
    const setComments = (id) => {
        getComments(id)
        .then((data)=> {
            commentChange(data);
        })
        .catch((err)=> {
            errorTypeCheck(err,refreshToken,taskActions,history);
        })
    }
    const updateComment = (text) => 
    new Promise((resolve, reject) =>{
        const header = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        const data = {
            board_id: parseInt(number),
            description: text,
        }
        Axios.post(`${wooServer}/comment`,data,header)
        .then((response)=> {
            const data = response.data;
            resolve(data)
        })
        .catch((err)=> {
            reject(err)
        })
    })

    const getCoComment = (id) => 
    new Promise((resolve, reject) => {
        const header = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        Axios.get(`${wooServer}/cocomment/${id}`,header)
        .then((response)=> {
            const data = response.data;
            resolve(data);
        })
        .catch((err)=> {
            reject(err);
        })
    })

    const updateCoComment = (text,id) => 
    new Promise((resolve, reject)=> {
        const header = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        const data = {
            comment_id: id,
            description: text,
        }
        Axios.post(`${wooServer}/cocomment`,data,header)
        .then((response)=> {
            const data = response.data;
            resolve(data);
        })
        .catch((err)=> {
            reject(err);
        })
    })

    const deleteCoComment = (id) => 
    new Promise((resolve,reject)=>{
        const header = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        Axios.delete(`${wooServer}/cocomment/${id}`,header)
        .then((response)=> {
            const data = response.data;
            resolve(data);
        })
        .catch((err)=> {
            reject(err);
        })
    })
    const deleteComment = (id) => 
    new Promise((resolve,reject)=>{
        const header = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        Axios.delete(`${wooServer}/comment/${id}`,header)
        .then((response)=> {
            const data = response.data;
            resolve(data);
        })
        .catch((err)=> {
            reject(err);
        })
    })
    const comentDeleteHandler = (id) => {
        console.log(comment, id);
        const buffer = [...comment].filter((comment)=> comment.comment_id !== id);
        console.log(buffer);
        commentChange(buffer);
    }
    const cocomentDeleteHandler = (commentArray,commentChange, id) => {
        const buffer = [...commentArray].filter((comment)=> comment.cocomment_id !== id);
        commentChange(buffer);
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
                        imgs={boardInfo.file_id}
                    />
                    <BoardComments
                        comment={comment}
                        commentChange={commentChange}
                        updateComment={updateComment}
                        updateCoComment={updateCoComment}
                        deleteComment={deleteComment}
                        deleteCoComment={deleteCoComment}
                        getCoComment={getCoComment}
                        userInfo={userInfo}
                        deleteCommentHandler={comentDeleteHandler}
                        deleteCoCommentHandler={cocomentDeleteHandler}
                    />
                </div>
            </S.Task>
        </>
    )
}

export default withRouter(BoardDetail);