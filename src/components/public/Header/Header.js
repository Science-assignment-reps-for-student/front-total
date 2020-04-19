import React from 'react';
import * as S from '../style/PublicStyle';
import HeaderButton from './HeaderButton';
import { AccessTokenConsumer } from '../../../context/AccessTokenContext';
import { withRouter } from 'react-router-dom'

const Header = ({ isCheck, history }) => {

    return (
        <S.Header>
            <div>
                <p id="title" onClick={()=> history.push('/Admin')}><span>SCARFS </span>Admin console</p>
                <div>
                    <AccessTokenConsumer>
                        {
                            ({actions})=> {
                                return (
                                    <>
                                        <HeaderButton page="main" actions={actions}>제출현황</HeaderButton>
                                        <HeaderButton page="make" actions={actions}>과제생성</HeaderButton>
                                        <HeaderButton isCheck={isCheck} page="qna" actions={actions}>QnA</HeaderButton>
                                        <HeaderButton isCheck={isCheck} page="board" actions={actions}>게시판</HeaderButton>
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

export default withRouter(Header);