import React from 'react';
import * as S from '../style/BoardDetailStyle';

const BoardTop = () => {
    return (
        <S.TaskTop className="task-top">
            <div className="task-header">
                <div>
                    <h1>제목</h1>
                </div>
                <nav>
                    <ul>
                        <li>아이디</li>
                        <li>조회수</li>
                        <li><span>작성일</span></li>
                    </ul>
                </nav>
            </div>
            <div className="task-desc">
                <div className="desc">
                    <p>내용쓰세요를레이히~</p>
                </div>
            </div>
        </S.TaskTop>
    )
}

export default BoardTop;