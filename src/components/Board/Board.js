import React, { useState, useEffect } from 'react';
import { Header } from '../Header';
import * as S from './style/boardStyle';
import { BoardComponent } from './components';
import { withRouter } from 'react-router-dom';

const Board = ({ state, getUserInfo, history }) => {
    const { limServer, wooServer, accessToken, refreshToken } = state;
    const [search, searchChange] = useState();
    const [postList, postListChange] = useState([
        {
            title: "이성진 바보",
            writer: "오준상",
            createDate: "2020-03-16",
            comment: 3,
            viewCount: 3,
            isNew: true,
        },
        {
            title: "이성진 바보",
            writer: "오준상",
            createDate: "2020-03-16",
            comment: 3,
            viewCount: 3,
            isNew: true,
        },
        {
            title: "이성진 바보",
            writer: "오준상",
            createDate: "2020-03-16",
            comment: 3,
            viewCount: 3,
            isNew: true,
        },
        {
            title: "이성진 바보",
            writer: "오준상",
            createDate: "2020-03-16",
            comment: 3,
            viewCount: 3,
            isNew: true,
        },
        {
            title: "이성진 바보",
            writer: "오준상",
            createDate: "2020-03-16",
            comment: 3,
            viewCount: 3,
            isNew: true,
        },
        {
            title: "이성진 바보",
            writer: "오준상",
            createDate: "2020-03-16",
            comment: 3,
            viewCount: 3,
            isNew: true,
        },
        {
            title: "이성진 바보",
            writer: "오준상",
            createDate: "2020-03-16",
            comment: 3,
            viewCount: 3,
            isNew: true,
        },{
            title: "이성진 바보",
            writer: "오준상",
            createDate: "2020-03-16",
            comment: 3,
            viewCount: 3,
            isNew: true,
        }
        ,{
            title: "이성진 바보",
            writer: "오준상",
            createDate: "2020-03-16",
            comment: 3,
            viewCount: 3,
            isNew: true,
        }
        ,{
            title: "이성진 바보",
            writer: "오준상",
            createDate: "2020-03-16",
            comment: 3,
            viewCount: 3,
            isNew: true,
        }
        ,{
            title: "이성진 바보",
            writer: "오준상",
            createDate: "2020-03-16",
            comment: 3,
            viewCount: 3,
            isNew: true,
        }
        ,{
            title: "이성진 바보",
            writer: "오준상",
            createDate: "2020-03-16",
            comment: 3,
            viewCount: 3,
            isNew: true,
        }

    ])
    const [page, pageChange] = useState(0);
    const createList = (postList) => {
        let buffer = [];
            const pageMaxComponent = 8;
            for(let i = getComponentCount();i < getComponentCount() + pageMaxComponent;i++){
                if(!postList[i]){break;}
                const { title, writer, createDate, viewCount, comment, isNew } = postList[i];
                buffer.push(
                    <BoardComponent
                        title={title}
                        writer={writer}
                        createDate={createDate}
                        viewCount={viewCount}
                        comment={comment}
                        isNew = {isNew}
                        key={title+viewCount}
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
                    onClick={() =>  pageChange(i)}
                >
                    <span>{i+1}</span>
                </li>
            )
        }
        return list;
    }

    const setPageNext = (page) => {
        if(page + 1 >= getPageMax()) { return; }
        pageChange(page + 1);
    }

    const setPageCurrent = (page) => {
        if(page - 1 === -1) { return; }
        pageChange(page - 1);
    }

    const getPageMax = () => {
        const postCount = postList.length;
        return Math.ceil(postCount / 8);
    }

    const getComponentCount = () => {
        return page * 8;
    }

    useEffect(()=> {
        const userInfoPro = getUserInfo(limServer,accessToken);
        if(!userInfoPro){ history.push('/'); }
    },[])

    return (
        <>
            <Header/>
            <S.BoardGuide>
                <div>
                    <div className="task-guide-top">
                        <h1>n반 게시판</h1>
                        <div>
                            <div>
                                <input 
                                    type="text" 
                                    onChange={(e) => {
                                        searchChange(e);
                                    }} 
                                    value={search}
                                />
                            </div>
                            <div><button>검색</button></div>
                            <div className="button" onClick={()=> history.push('/write')}>글쓰기</div>
                        </div>
                    </div>
                    <div className="task-guide-table">
                        <table>
                            <tbody>
                                <tr>
                                    <th></th>
                                    <th className="writer">작성이</th>
                                    <th className="title">제목</th>
                                    <th className="creationDate">작성일</th>
                                    <th className="viewCount">조회수</th>
                                    <th className="comment">댓글</th>
                                </tr>
                                {createList(postList)}
                            </tbody>
                        </table>
                    </div>
                    <div className="task-guide-page">
                        <ul>
                            <li className="clicked" onClick={() => setPageCurrent(page)}><i></i></li>
                            {getBottomPageList()}
                            <li className="clicked" onClick={() => setPageNext(page)}><i></i></li>
                        </ul>
                    </div>
                </div>
            </S.BoardGuide>
        </>
    )
}

export default withRouter(Board);