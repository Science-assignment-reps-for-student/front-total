import React from 'react';
import * as S from '../style/BoardDetailStyle';
import { BoardCommentContent } from '../components';

const BoardComment = ({ 
    name, 
    content, 
    date, 
    id, 
    updateCoComment,
    deleteComment,
    deleteCoComment,
    getCoComment,
    userInfo,
    deleteCommentHandler,
    deleteCoCommentHandler,
}) => {
    
    return (
        <S.BoardComment>
            <BoardCommentContent 
                name={name} 
                content={content} 
                date={date} 
                id={id}
                updateCoComment={updateCoComment}
                deleteCoComment={deleteCoComment}
                deleteComment={deleteComment}
                getCoComment={getCoComment}
                userInfo={userInfo}
                deleteCoCommentHandler={deleteCoCommentHandler}
                deleteCommentHandler={deleteCommentHandler}
            />
        </S.BoardComment>
    )
}

export default BoardComment;