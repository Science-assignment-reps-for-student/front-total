import React from 'react';
import * as S from '../style/BoardDetailStyle';
import { BoardComment } from '../components';

const BoardComments = () => {
    const dummyData = [
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
    ]
    return (
        <>
            {
                dummyData.map((comment)=> {
                    const { name, content, date, isMine, cocomment } = comment;
                    return <BoardComment name={name} content={content} date={date} isMine={isMine} comments={cocomment}/>
                })
            }
        </>
    )
}

export default BoardComments;