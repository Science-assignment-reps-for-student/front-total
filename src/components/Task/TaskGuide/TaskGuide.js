import React, { useCallback, useState, useEffect, useReducer } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { getAccessTokenUsingRefresh } from '../../resource/publicFunction';
import * as Styled from './styled';
import { List } from './component';
import axios from 'axios';
import { Header } from '../../../components';

const reducer = (state, action) => {
    switch (action.type) {
        case "curPage":
            return { ...state, curPage: action.curPage };
        case "allPages":
            return { ...state, allPages: action.allPages };
        case "bottomList":
            return { ...state, bottomList: action.bottomList };
        default:
            return state;
    }
};

const TaskGuide = ({ state, taskActions, setHomework, setHomeworkDataInState }) => {
    const history = useHistory();
    const { limServer, accessToken } = state;
    const [search, setSearch] = useState("");
    const [listDatas, setListDatas] = useState([]);
    const [pageState, pageDispatch] = useReducer(reducer, {
        curPage: 1,
        allPages: 1,
        bottomList: 1,
    });
    const { curPage, allPages, bottomList } = pageState;

    const searchChange = useCallback((e) => setSearch(e.target.value), []);
    const setAllPages = useCallback((all) => pageDispatch({ type: "allPages", allPages: all }), []);
    const setCurPage = useCallback((current) => pageDispatch({ type: "curPage", curPage: current }), []);
    const setBottomList = useCallback((bottom) => pageDispatch({ type: "bottomList", bottomList: bottom }), []);
    const homeworkRequest = useCallback(() => {
        if (typeof accessToken === "object") return;
        axios.get(`${limServer}/homework`, {
            headers: {
                "Authorization": accessToken,
                "Content-Type": "application/json",
            }
        }).then((response) => {
            setListDatas(response.data);
        }).catch((error) => {
            if (typeof error.response === "undefined") return;
            const code = error.response.status;
            if (code === 404)
                history.push("/");
            else if (code === 410)
                getAccessTokenUsingRefresh(state, taskActions);
        })
    }, [setListDatas, state]);
    const createList = useCallback((_list) => {
        const list = [];
        for (let i = (curPage * 8) - 7; i <= curPage * 8; i++) { // (1 ~ 8) * n ~~
            if (i > listDatas.length) break;
            list.push(<List
                key={i}
                state={state}
                data={listDatas[i - 1]}
                setHomework={setHomework}
                setHomeworkDataInState={setHomeworkDataInState}
            />)
        };
        return list;
    }, [listDatas, curPage, setHomework]);
    const setAllPageList = useCallback(() => {
        const isOnePage = (Math.floor(listDatas.length / 8) && listDatas.length % 8 !== 0);
        isOnePage ? setAllPages(Math.floor(listDatas.length / 8) + 1) : setAllPages(1);
    }, [listDatas, setAllPages]);
    const getBottomPageList = useCallback(() => {
        const list = [];
        for (let i = (bottomList * 5) - 4; i <= (bottomList * 5) && i <= allPages; i++) { // (1 ~ 5) * n ~~
            list.push(<li key={i - 1} onClick={() => setCurPage(i)}
                className={curPage === (i) ? "clicked" : null} >
                <span>{i}</span>
            </li>)
        }
        return list;
    }, [allPages, curPage, bottomList]);
    const setBottomPageList = useCallback((type) => {
        if (type === "minus") {
            if (bottomList === 1) return;
            setCurPage((bottomList - 1) * 5);
            setBottomList(bottomList - 1);
        }
        if (type === "plus") {
            if ((bottomList * 5) >= allPages) return;
            setCurPage((bottomList + 1) * 5 - 4);
            setBottomList(bottomList + 1);
        }
    }, [allPages, bottomList]);

    useEffect(() => {
        homeworkRequest();
    }, []);
    useEffect(() => {
        setAllPageList();
    }, [listDatas]);

    return (
        <>
            <Header/>
            <Styled.TaskGuide>
                <div>
                    <div className="task-guide-top">
                        <h1>과제 안내</h1>
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
                        </div>
                    </div>
                    <div className="task-guide-table">
                        <table>
                            <tbody>
                                <tr>
                                    <th className="type">유형</th>
                                    <th className="title">제목</th>
                                    <th className="creationDate">작성일</th>
                                    <th className="dueDate">기한</th>
                                    <th className="member">동료평가</th>
                                    <th className="submissionStatus">제출여부</th>
                                </tr>
                                {createList()}
                            </tbody>
                        </table>
                    </div>
                    <div className="task-guide-page">
                        <ul>
                            <li className="clicked" onClick={() => setBottomPageList("minus")}><i></i></li>
                            {getBottomPageList()}
                            <li className="clicked" onClick={() => setBottomPageList("plus")}><i></i></li>
                        </ul>
                    </div>
                </div>
            </Styled.TaskGuide>
        </>
    )
};

export default React.memo(withRouter(TaskGuide));