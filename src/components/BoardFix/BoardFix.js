import React, { useEffect, useState } from 'react';
import { Header } from '../Header';
import * as S from './style/BoardInputStyle';
import { withRouter, useParams } from 'react-router-dom';
import { errorTypeCheck } from '../resource/publicFunction';
import BoardInputImg from './components/BoardInputImg';
import Axios from 'axios';

const BoardFix = ({ 
    state, 
    getUserInfo, 
    history, 
    taskActions 
}) => {
    const [title, titleChange] = useState("");
    const [describe, describeChange] = useState("")
    const [userInfo, userInfoChange] = useState({});
    const [classNum, classNumChange] = useState()
    const [imgs, imgChange] = useState([]);
    const { limServer, wooServer, accessToken, refreshToken } = state;
    const { number } = useParams();
    useEffect(()=> {
        const userInfoPro = getUserInfo(limServer,accessToken);
        userInfoPro
        .then((response)=> {
            const data = response.data;
            userInfoChange(data);
            setBoardInfo(number);
        })
        .catch((err)=> {
            errorTypeCheck(err,refreshToken,taskActions,history,"/");
        })
    },[])
    const titleChangeHandler = (event) => {
        const data = event.target.value;
        titleChange(data);
    }
    const describeChangeHandler = (event) => {
        const data = event.target.value;
        describeChange(data);
    }
    const imgChangeHandler = (event) => {
        const data = event.target.files;
        const buffer = [...imgs, ...data];
        imgChange(buffer);
    }
    const setImg = () => {
        let buffer = [];
        for(let i = 0;i < imgs.length; i++){
            buffer.push(<BoardInputImg 
                imgs={imgs} 
                imgChange={imgChange} 
                index={i}
            />)
        }
        return buffer;
    }
    const classNumselectHandler = (event) => {
        const value = event.target.value;
        classNumChange(value);
    }
    const fixBoard = (title,describe,imgs,classNum) => {
        const header = {
            headers: {   
                "Authorization": `Bearer ${accessToken}`
            }
        }
        const data = setData(title,describe,imgs,classNum);
        if(isAble(title,describe)){
            Axios.put(
                `${wooServer}/board/${number}`,
                data,
                header
            )
            .then(()=> {
                history.push('/board');
            })
            .catch((err)=> {
                errorTypeCheck(err,refreshToken,taskActions,history,"/");
            })
        } else {
            alert("내용을 모두 채웠는지 확인해 주세요.")
        }
    }
    const setData = (title,describe,imgs,classNum) => {
        const data = new FormData();
        imgs.map((img)=> {
            data.append("file[]",img);
            return img;
        })
        data.append("title",title);
        data.append("description",describe);
        if(classNum){
            data.append("class_number",classNum);
        }
        return data;
    }
    const isAble = (title,describe) => {
        if(title && describe){
            return true;
        }
        return false;
    }
    const getBoardInfo = (number) => 
    new Promise((resolve,reject)=>{
        const header = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        Axios.get(`${wooServer}/board/${number}`,header)
        .then((data)=> {
            resolve(data)
        })
        .catch((err)=> {
            reject(err);
        })
    });
    const setBoardInfo = (number) => {
        getBoardInfo(number)
        .then((response)=> {
            const data = response.data;
            titleChange(data.title);
            describeChange(data.description);
            if(data.file_id){
                imgChange(data.file_id);
            }
        })
        .catch((err)=> {
            errorTypeCheck(err,refreshToken,taskActions,history,"/board");
        })
    }
    return (
        <>
            <S.BoardInput>
                <Header/>
                <S.BoardInputBody>
                    <div>
                        <h1>게시글 수정</h1>
                        <p>제목</p>
                        <input 
                            placeholder="제목을 입력해주세요..." 
                            onChange={titleChangeHandler}
                            value={title}
                        />
                        <div className="imgDiv">
                            {
                                userInfo.userType !== 0 ? 
                                <select onChange={classNumselectHandler}>
                                    <option>반 선택</option>
                                    <option>1반</option>
                                    <option>2반</option>
                                    <option>3반</option>
                                    <option>4반</option>
                                </select> : ""
                            }
                            <label>
                                <p>+ 사진 첨부하기</p>
                                <input 
                                    className="img"
                                    type="file"
                                    accept=".jpg, .jpeg, .png, .bmp, .gif"
                                    multiple
                                    onChange={imgChangeHandler}
                                />
                            </label>
                        </div>
                        <p>내용</p>
                        <textarea 
                            placeholder="내용을 입력해주세요..." 
                            value={describe}
                            onChange={describeChangeHandler}
                        />
                        <div className="img">
                            {
                                setImg()
                            }
                        </div>
                        <div>
                            <div 
                                className="upload"
                                onClick={()=> fixBoard(title,describe,imgs,classNum)}
                            >
                                <p>등록하기</p>
                            </div>
                            <div 
                                className="cancel"
                                onClick={() => history.push('/board')}
                            >
                                <p>삭제</p>
                            </div>
                        </div>
                    </div>
                </S.BoardInputBody>
            </S.BoardInput>
        </>
    )
}

export default withRouter(BoardFix);