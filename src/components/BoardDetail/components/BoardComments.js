import React, { useState } from 'react';
import { BoardComment, BoardCommentInput } from '../components';

const BoardComments = () => {
    const [data, dataChange] = useState([
        {
            name: "강신희",
            content: "강신희 바보",
            date: "2020-03-23",
            isMine: true,
            cocomment: []
        },
        {
            name: "강신희",
            content: "강신희 바보",
            date: "2020-03-23",
            isMine: false,
            cocomment: [
                {
                    name: "강신희",
                    content: "강신희 바보",
                    date: "2020-03-23",
                    isMine: true,
                    cocomment: []
                }
            ]
        }
    ]);
    return (
        <>
            {
                data.map((comment)=> {
                    const { name, content, date, isMine, cocomment } = comment;
                    return <BoardComment name={name} content={content} date={date} isMine={isMine} comments={cocomment}/>
                })
            }
            <BoardCommentInput commentData={data} dataChange={dataChange} isCheck={true}/>
        </>
    )
}

export default BoardComments;