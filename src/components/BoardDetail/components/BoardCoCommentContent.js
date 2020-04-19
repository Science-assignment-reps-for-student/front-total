import React from 'react';
import * as S from '../style/BoardDetailStyle';
const BoardCoCommentContent =  ({ 
    name, 
    date, 
    content, 
    id,
    deleteCoComment,
    deleteCoCommentHandler,
    comment,
    commentChange,
})=> {
    const deleteButtonClickHandler = () => {
        deleteCoComment(id)
        .then(()=> {
            deleteCoCommentHandler(comment,commentChange,id);
        })
        .catch(()=> {
            alert("권한이 없습니다.")
        })
    }
    return (
        <S.BoardCommentContent key={id}>
            <div className="comment">
                <p>
                    <span className="name">{name}</span>
                    <span className="content">{content}</span>
                </p>
                <div>
                    <div>
                        <span>{date}</span>
                        {
                            <>
                                <div>
                                    <span className="delete" onClick={deleteButtonClickHandler}>삭제</span>
                                </div> 
                            </>
                        }
                    </div>
                    </div>
            </div> 
        </S.BoardCommentContent>
    )
}

export default BoardCoCommentContent;