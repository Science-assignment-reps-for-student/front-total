import React from 'react';
import { BoardComment, BoardCommentInput } from '../components';

const BoardComments = ({ 
    comment, 
    commentChange, 
    updateComment, 
    updateCoComment,
    deleteComment,
    deleteCoComment,
    getCoComment,
    userInfo,
    deleteCommentHandler,
    deleteCoCommentHandler,
}) => {

    return (
        <>
            {
                comment.map((comment)=> {
                    const { writer, description, created_at, comment_id } = comment;
                    const date = created_at.split("T")[0]
                    return <BoardComment 
                        name={writer} 
                        content={description} 
                        date={date}
                        id={comment_id} 
                        updateCoComment={updateCoComment}
                        deleteCoComment={deleteCoComment}
                        deleteComment={deleteComment}
                        getCoComment={getCoComment}
                        userInfo={userInfo}
                        deleteCoCommentHandler={deleteCoCommentHandler}
                        deleteCommentHandler={deleteCommentHandler}
                        key={description+comment_id}
                    />
                })
            }
            <BoardCommentInput 
                commentData={comment}   
                dataChange={commentChange} 
                isCheck={true} 
                updateComment={updateComment}
                userInfo={userInfo}
            />
        </>
    )
}

export default BoardComments;