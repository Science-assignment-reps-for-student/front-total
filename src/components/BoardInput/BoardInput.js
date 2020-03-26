import React, { useEffect } from 'react';
import { Header } from '../Header';
import * as S from './style/BoardInputStyle';
import { withRouter } from 'react-router-dom';

const BoardInput = ({ state, getUserInfo, history }) => {
    const { limServer, wooServer, accessToken, refreshToken } = state;
    useEffect(()=> {
        const userInfoPro = getUserInfo(limServer,accessToken);
        if(!userInfoPro){ history.push('/'); }
    },[])
    return (
        <>
            <S.BoardInput>
                <Header/>
                <S.BoardInputBody>
                    <div>
                        <h1>게시글 작성</h1>
                        <p>제목</p>
                        <input placeholder="제목을 입력해주세요..."/>
                        <p>내용</p>
                        <textarea placeholder="내용을 입력해주세요..."/>
                        <div>
                            <div className="upload">
                                <p>등록하기</p>
                            </div>
                            <div className="cancel">
                                <p>삭제</p>
                            </div>
                        </div>
                    </div>
                </S.BoardInputBody>
            </S.BoardInput>
        </>
    )
}

export default withRouter(BoardInput);