import React, { useState } from 'react';
import * as S from '../style/BoardDetailStyle';

const BoardCommentInput = ({ isCheck, dataChange, commentData, updateComment, userInfo, id, isCoCo }) => {
    const [inputValue, inputValueChange] = useState(""); 
    const inputChangeHandler = (event) => {
        const target = event.target;
        inputValueChange(target.value);
    }
    const inputKeyPressHandler = (event) => {
        const key = event.key;
        if(key === "Enter"){
            if(id){
                updateComment(inputValue,id.toString())
                .then((response)=> {
                    const copy = commentData.slice(0);
                    if(isCoCo){
                        console.log(response);
                        copy.push({
                            cocomment_id: response.cocomment_id,
                            description: inputValue,
                            writer: userInfo.userName,
                            created_at: response.created_at,
                        })
                    } else {
                        copy.push({
                            comment_id: response.comment_id,
                            description: inputValue,
                            writer: userInfo.userName,
                            created_at: response.created_at,
                        })
                    }
                    dataChange(copy);
                    inputValueChange("");
                })
                .catch((err)=> {
                    alert("권한이 없습니다. 반을 확인해 주세요.")
                })
            } else {
                updateComment(inputValue)
                .then((response)=> {
                    const copy = commentData.slice(0);
                    if(isCoCo){
                        copy.push({
                            cocomment_id: response.cocomment_id,
                            description: inputValue,
                            writer: userInfo.userName,
                            created_at: response.created_at,
                        })
                    } else {
                        copy.push({
                            comment_id: response.comment_id,
                            description: inputValue,
                            writer: userInfo.userName,
                            created_at: response.created_at,
                        })
                    }
                    dataChange(copy);
                    inputValueChange("");
                })
                .catch((err)=> {
                    alert("권한이 없습니다. 반을 확인해 주세요.")
                })
            }
        }
    }
    const getDate = () => {
        const nowDate = new Date();
        return `${nowDate.getFullYear()}-${nowDate.getMonth()}-${nowDate.getDay()}`;
    }
    const buttonClickHandler = () => {
        if(id){
            updateComment(inputValue,id.toString())
            .then((response)=> {
                const copy = commentData.slice(0);
                if(isCoCo){
                    copy.push({
                        cocomment_id: response.cocomment_id,
                        description: inputValue,
                        writer: userInfo.userName,
                        created_at: response.created_at,
                    })
                } else {
                    copy.push({
                        comment_id: response.comment_id,
                        description: inputValue,
                        writer: userInfo.userName,
                        created_at: response.created_at,
                    })
                }
                dataChange(copy);
                inputValueChange("");
            })
            .catch((err)=> {
                alert("권한이 없습니다. 반을 확인해 주세요.")
            })
        } else {
            updateComment(inputValue)
            .then((response)=> {
                const copy = commentData.slice(0);
                if(isCoCo){
                    copy.push({
                        cocomment_id: response.cocomment_id,
                        description: inputValue,
                        writer: userInfo.userName,
                        created_at: response.created_at,
                    })
                } else {
                    copy.push({
                        comment_id: response.comment_id,
                        description: inputValue,
                        writer: userInfo.userName,
                        created_at: response.created_at,
                    })
                }
                dataChange(copy);
                inputValueChange("");
            })
            .catch((err)=> {
                alert("권한이 없습니다. 반을 확인해 주세요.")
            })
        }
    }
    return (
        <S.BoardCommentInput isCheck={isCheck}>
            <input placeholder="댓글을 입력하세요..." onChange={inputChangeHandler} onKeyPress={inputKeyPressHandler} value={inputValue}/>
            <div className="button" onClick={buttonClickHandler}>등록</div>
        </S.BoardCommentInput>
    )
}

export default BoardCommentInput;