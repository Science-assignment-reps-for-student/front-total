import React, { useCallback } from 'react';
import background from './background.png';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const NoMatchWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${background});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentBlock = styled.section`
    width: 320px;
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    > h1 {
        font-size: 64px;
        font-family: 'Roboto';
        font-weight: 100;
    }
    > p {
        margin: 12px 0 24px 0;
    }
    > p: last-child {
        cursor: pointer;
        color: #FF5700;
    }
`;


const NoMatch = ({ history }) => {
    const onClick = useCallback(() => {
        if (document.referrer && document.referrer.indexOf("dsm-scarfs.hs.kr") !== -1) { 
            history.goBack();
        } else { 
            history.push('/');
        }
    }, [history]);
    return (
        <NoMatchWrapper>
            <ContentBlock>
                <h1>404</h1>
                <p>요청하신 페이지를 찾을 수 없습니다.</p>
                <p onClick={onClick}>◀︎ 이전 페이지로 이동</p>
            </ContentBlock>
        </NoMatchWrapper>
    );
};

export default withRouter(NoMatch);