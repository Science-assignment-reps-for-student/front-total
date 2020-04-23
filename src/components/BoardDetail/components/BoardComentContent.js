import React, { useState, useEffect } from 'react';
import * as S from '../style/BoardDetailStyle';
import BoardCommentInput from './BoardCommentInput';
import BoardCoCommentContent from './BoardCoCommentContent';
const BoardCommentContent =  ({ 
    name, 
    date, 
    content, 
    id, 
    updateCoComment, 
    deleteComment, 
    deleteCoComment, 
    getCoComment,
    userInfo,
    deleteCommentHandler,
    deleteCoCommentHandler,
})=> {
    const [isCheck, checkChange] = useState(false);
    const [commentData, dataChange] = useState([]);
    useEffect(()=> {
        if(id){
            getCoComment(id)
            .then((response)=> {
                dataChange(response);
            })
        }
    },[])
    const deleteButtonClickHandler = () => {
        const isAble = window.confirm("정말로 삭제하겠습니까?");
        if(isAble){
            deleteComment(id)
            .then(()=> {
                deleteCommentHandler(id);
            })
            .catch(()=> {
                alert("권한이 없습니다.");
            })
        }
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
                                    <span onClick={()=> checkChange(!isCheck)}>답글</span>
                                </div> 
                            </>
                        }
                    </div>
                    </div>
            </div> 
            <BoardCommentInput 
                commentData={commentData} 
                dataChange={dataChange} 
                isCheck={isCheck} 
                updateComment={updateCoComment} 
                id={id}
                userInfo={userInfo}
                isCoCo={true}      
            />
            <div className="children">
                {
                    commentData.map((comment)=> {
                        const { created_at, description, writer, cocomment_id } = comment;
                        const date = created_at.split("T")[0]
                        return <BoardCoCommentContent
                            date={date}
                            content={description}
                            name={writer}
                            id={cocomment_id}
                            deleteCoComment={deleteCoComment}
                            deleteCoCommentHandler={deleteCoCommentHandler}
                            comment={commentData}
                            commentChange={dataChange}
                            key={content+id}
                        />
                    })
                }
            </div>
        </S.BoardCommentContent>
    )
}

export default BoardCommentContent;