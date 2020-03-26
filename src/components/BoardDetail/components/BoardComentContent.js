import React, { useState } from 'react';
import * as S from '../style/BoardDetailStyle';
import { BoardCommentInput } from '../components';

const BoardCommentContent =  ({ isMine, name, date, comments, content })=> {
    const [isCheck, checkChange] = useState(false);
    const [commentData, dataChange] = useState(comments);
    const [isFix, fixChange] = useState(false);
    return (
        <S.BoardCommentContent isFix={isFix}>
            <div className="comment">
                <p>
                    <span className="name">{name}</span>
                    <span className="content">{content}</span>
                    <input placeholder="내용을 입력하세요."/>
                </p>
                <div>
                    <div>
                        <span>{date}</span>
                        {
                            isMine ?
                            <div>
                                <span className="delete">삭제</span>
                                <span className="fix" onClick={()=> fixChange(!isFix)}>수정</span>
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