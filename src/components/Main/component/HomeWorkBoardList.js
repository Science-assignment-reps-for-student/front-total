import React, { useState, useEffect } from 'react';
import { HomeWorkBoardWrapper, PaginationWrapper, PaginationItemBlock } from '../styles';
import HomeworkBoardItem from './HomeWorkBoardItem';
import ApiDefault from '../../utils';
import prevButton from '../img/prevButton.png';
import nextButton from '../img/nextButton.png';

const HomeWorkBoardList = ({ state, homework }) => {
    const [paginationNumber, setPaginationNumber] = useState([]);
    const [nowPage, setNowPage] = useState(!homework.length ? undefined : 1);
    const [startPage, setStartPage] = useState(Math.floor((nowPage - 1) / 5) * 5 + 1);
    const [endPage] = useState(!homework.length ? undefined : homework.length % 8 !== 0 ? Math.floor(homework.length / 8) + 1 : Math.floor(homework.length) / 8);

    const getHomeworkBoardItem = () => {
        const list = homework.map((data, index) => {
            if (index >= (nowPage * 8) || index < (nowPage - 1) * 8) return false;
            let isTeam = null;
            let isImportant = (new Date(data['homework_deadline']).getTime() - new Date().getTime()) < 1 * 24 * 60 * 60 * 1000 * 2 ? true : false;
            const getTeam = () => {
                ApiDefault.get('team', {
                    params: {
                        homeworkId: data.id
                    },
                    headers: {
                        Authorization: state.accessToken
                    }
                }).then(_ => {
                    isTeam = true;
                }).catch(_ => {
                    isTeam = false;
                })
            };
            getTeam();
            return <HomeworkBoardItem data={data} key={data.id} isTeam={isTeam} isImportant={isImportant} />;
        })
        return list;
    };
    const getPaginationNumber = () => {
        const list = paginationNumber.map(n => {
            if (n < startPage || n > startPage + 4) return false;
            return <PaginationItemBlock key={n} activeStyle={n === nowPage} onClick={() => setNowPage(n)}><span>{n}</span></PaginationItemBlock>;
        });
        return list;
    }

    useEffect(() => {
        const a = [];
        for (var i = 1; i <= endPage; i++) a.push(i);
        setPaginationNumber(a);
    }, [endPage]);

    return (
        <HomeWorkBoardWrapper>
            <h1>과제안내</h1>
            <hr />
            <div>
                <header>
                    <div>
                        <span>유형</span>
                        <span>제목</span>
                        <span>작성일</span>
                        <span>기한</span>
                        <span>팀원</span>
                        <span>제출여부</span>
                    </div>
                </header>
                <main>
                    {getHomeworkBoardItem()}
                </main>
            </div>
            <PaginationWrapper>
                {(homework.length !== 0 && startPage !== 1) &&
                    <div onClick={() => {
                        setStartPage(startPage - 5);
                        setNowPage(startPage - 5);
                    }}>
                        <img alt="이전버튼" src={prevButton} />
                    </div>
                }
                <ul>
                    {getPaginationNumber()}
                </ul>
                {(homework.length !== 0 && !((startPage - 1) / 5 === Math.floor((endPage - 1) / 5))) && 
                    <div onClick={() => {
                        setStartPage(startPage + 5);
                        setNowPage(startPage + 5);
                    }}>
                        <img alt="다음버튼" src={nextButton} />
                    </div>
                }
            </PaginationWrapper>
        </HomeWorkBoardWrapper>
    );
};

export default HomeWorkBoardList;