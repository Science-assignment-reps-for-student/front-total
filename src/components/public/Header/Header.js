import React, { useState, useEffect } from 'react';
import * as S from '../style/PublicStyle';
import HeaderButton from './HeaderButton';
import { AccessTokenConsumer } from '../../../context/AccessTokenContext';

const Header = ({ state, actions, isCheck }) => {

    return (
        <S.Header>
            <div>
                <p id="title"><span>SCARFS </span>Admin console</p>
                <div>
                    <AccessTokenConsumer>
                        {
                            ({actions})=> {
                                return (
                                    <>
                                        <HeaderButton page="main" actions={actions}>제출현황</HeaderButton>
                                        <HeaderButton page="make" actions={actions}>과제생성</HeaderButton>
                                        <HeaderButton isCheck={isCheck} page="qna" actions={actions}>QnA</HeaderButton>
                                    </>
                                )
                            }
                        }
                    </AccessTokenConsumer>
                </div>
            </div>
            <div>
                <div id="logOut">
                    <AccessTokenConsumer>
                        {
                            ({actions}) => <HeaderButton page="logout" actions={actions}>로그아웃</HeaderButton>
                        }
                    </AccessTokenConsumer>
                </div>
            </div>
        </S.Header>
    )
}

export default Header;