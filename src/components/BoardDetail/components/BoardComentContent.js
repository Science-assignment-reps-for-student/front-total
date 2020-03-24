import React, { useState } from 'react';
import * as S from '../style/BoardDetailStyle';
import { BoardCommentInput } from '../components';

const BoardCommentContent =  ({ isMine, name, date, comments, content })=> {
    const [isCheck, checkChange] = useState(false);
    const [commentData, dataChange] = useState(comments);
    return (
        <S.BoardCommentContent>
            <div className="comment">
                <p>
                    <span className="name">{name}</span>
                    <span>{content}</span>
                </p>
                <div>
                    <div>
                        <span>{date}</span>
                        {
                            isMine ?
                            <div>
                                <span className="delete">삭제</span>
                                <span className="fix">수정</span>
                            </div> :
                            <div>
                                <span onClick={()=> checkChange(!isCheck)}>답글</span>
                            </div>
                        }
                    </div>
                    </div>
            </div>
            {
                isMine ? <></> : <BoardCommentInput commentData={commentData} dataChange={dataChange} isCheck={isCheck}/>
            }   
            <div className="children">
                {
                    commentData.map((comment)=> {
                        const { name, content, date, isMine, cocomment } = comment;
                        return <BoardCommentContent name={name} content={content} date={date} isMine={isMine} comments={cocomment}/>
                    })
                }
            </div>
        </S.BoardCommentContent>
    )
}

export default BoardCommentContent;