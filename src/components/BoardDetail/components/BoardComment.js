import React from 'react';
import * as S from '../style/BoardDetailStyle';
import { BoardCommentContent } from '../components';

const BoardComment = ({ name, content, date, isMine, comments }) => {
    
    return (
        <S.BoardComment>
            <BoardCommentContent name={name} content={content} date={date} isMine={isMine} comments={comments}/>
        </S.BoardComment>
    )
}

export default BoardComment;