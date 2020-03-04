import React, { useState, useEffect } from 'react';
import * as S from '../style/PublicStyle';
import HeaderButton from './HeaderButton';
import { AccessTokenConsumer } from '../../../context/AccessTokenContext';

const Header = ({ state, actions, isCheck }) => {

    const getNotificationPermission = () => {
        if (!("Notification" in window)) {
            alert("데스크톱 알림을 지원하지 않는 브라우저입니다.");
        }
        Notification.requestPermission(function (result) {
            if(result === 'denied') {
                alert('알림을 차단하셨습니다.\n브라우저의 사이트 설정에서 변경하실 수 있습니다.');
                return false;
            }
        });
    }

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