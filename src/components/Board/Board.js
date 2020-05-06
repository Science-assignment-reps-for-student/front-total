import React, { useState, useEffect } from 'react';
import { Header } from '../Header';
import * as S from './style/boardStyle';
import { BoardComponent } from './components';
import { withRouter } from 'react-router-dom';
import { errorTypeCheck } from '../resource/publicFunction';
import Axios from 'axios';

const Board = ({ state, getUserInfo, history, taskActions }) => {
    const { 
        limServer, 
        wooServer, 
        accessToken, 
        refreshToken 
    } = state;
    const [userInfo, userInfoChange] = useState({});
    const [classNum, classNumChange] = useState();
    const [postList, postListChange] = useState([])
    const [isLoading, isLoadChange] = useState(false);
    const [page, pageChange] = useState(-1);
    const createList = (postList) => {
        let buffer = [];
            const pageMaxComponent = 8;
            for(let i = getComponentCount();i < getComponentCount() + pageMaxComponent;i++){
                if(!postList[i] || isLoading){break}
                const { title, writer, created_at , viewCount, board_id } = postList[i];
                const time = created_at.split('T')[0];
                buffer.push(
                    <BoardComponent
                        title={title}
                        writer={writer}
                        createDate={time}
                        key={title+viewCount}
                        onClick={() => history.push(`/board/${board_id}`)}
                    />
                )
            }
        return buffer;
    }

    const getBottomPageList = () => {
        const list = [];
        for (let i = 0; i < getPageMax(page); i++) {
            list.push(<li 
                    key={i} 
                    className={page === i ? "clicked" : ""}
                    onClick={() =>  {
                        if(page === i){
                            return;
                        }
                        pageChange(i); 
                        isLoadChange(true);
                    }}
                >
                    <span>{i+1}</span>
                </li>
            )
        }
        return list;
    }

    const setPageNext = (page) => {
        pageChange(page + 1);
    }

    const setPageCurrent = (page) => {
        pageChange(page - 1);
    }

    const getPageMax = () => {
        const postCount = postList.length;
        return Math.ceil(postCount / 8);
    }

    const getComponentCount = () => {
        return page * 8;
    }

    const selectChangeHandler = ({ target }) => {
        const value = target.value;
        classNumChange(value);
    }

    const getUserClass = (userNumber) => {
        return userNumber.toString().split('')[1];
    }

    const setUserClass = (userData) => {
        if(userData.userType !== 0){
            classNumChange(1); 
        } else {
            const userClass = getUserClass(userData.userNumber);
            classNumChange(userClass);
        }
    }

    const getBoard = (classNum) => 
    new Promise((resolve,reject) => {
        const header = {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            }
        }
        Axios.get(`${wooServer}/board/?class_number=${classNum}`,header)
        .then(({ data })=> {
            resolve(data);
        })
        .catch((err)=> {
            reject(err);
        })
    })

    const setBoard = () => {
        getBoard(classNum)
        .then((data)=> {
            isLoadChange(true)
            postListChange(data);
        })
        .catch((err)=> {
            errorTypeCheck(err,refreshToken,taskActions,history,"/");
        })
    }

    useEffect(()=> {
        const userInfoPro = getUserInfo(limServer,accessToken);
        if(userInfoPro){
            userInfoPro
            .then((response)=> {
                const data = response.data;
                getUserClass(data.userNumber);
                userInfoChange(data);
                setUserClass(data);
            })
            .catch((err)=> {
                errorTypeCheck(err,refreshToken,taskActions,history,"/");
            })
        } else {
            history.push('/');
        }
    },[]);

    useEffect(()=> {
        if(classNum){
            setBoard();
            pageChange(0);
        }
    },[classNum])

    useEffect(()=> {
        isLoadChange(false);
    },[postList,page])



    return (
        <>
            <Header/>
            <S.BoardGuide>
                <div>
                    <div className="task-guide-top">
                    <h1>{classNum}반 게시판</h1>
                        <div>
                            {
                                userInfo.userType !== 0 ?
                                <S.BoardDropdown onChange={selectChangeHandler}>
                                    <option value="1">1반</option>
                                    <option value="2">2반</option>
                                    <option value="3">3반</option>
                                    <option value="4">4반</option>
                                </S.BoardDropdown> :
                                ""
                            }
                            <div 
                                className="button" 
                                onClick={()=> history.push('/write')}
                            >글쓰기</div>
                        </div>
                    </div>
                    <div className="task-guide-table">
                        <table>
                            <tbody>
                                <tr>
                                    <th className="writer">작성이</th>
                                    <th className="title">제목</th>
                                    <th className="creationDate">작성일</th>
                                </tr>
                                {createList(postList)}
                            </tbody>
                        </table>
                    </div>
                    <div className="task-guide-page">
                        <ul>
                            <li 
                                className="clicked" 
                                onClick={() => setPageCurrent(page)}
                            >
                                <i></i>
                            </li>
                            {getBottomPageList()}
                            <li 
                                className="clicked" 
                                onClick={() => setPageNext(page)}
                            >
                                <i></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </S.BoardGuide>
        </>
    )
}

export default withRouter(Board);