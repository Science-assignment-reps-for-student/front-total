import React, { useState } from 'react';
import * as S from '../style/BoardDetailStyle';

const BoardCommentInput = ({ isCheck, dataChange, commentData }) => {
    const [inputValue, inputValueChange] = useState(""); 
    const inputChangeHandler = (event) => {
        const target = event.target;
        inputValueChange(target.value);
    }
    const inputKeyPressHandler = (event) => {
        const key = event.key;
        const target = event.target;
        if(key === "Enter"){
            target.value = "";
            target.innerText = "";
            const copy = commentData.slice(0);
            copy.push({
                content: inputValue,
                name: "오준상",
                date: "2020-03-24",
                isMine: true,
                cocomment: [],
            })
            dataChange(copy);
        }
    }
    return (
        <S.BoardCommentInput isCheck={isCheck}>
            <input placeholder="댓글을 입력하세요..." onChange={inputChangeHandler} onKeyPress={inputKeyPressHandler}/>
            <div className="button">등록</div>
        </S.BoardCommentInput>
    )
}

export default BoardCommentInput;