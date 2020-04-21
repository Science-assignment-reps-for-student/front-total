import React, { useCallback } from 'react';
import styled from 'styled-components';

const time = new Date();
function setCookie(cname, value, expire) {
    var todayValue = new Date();
    todayValue.setDate(todayValue.getDate() + expire);
    document.cookie = cname + "=" + encodeURI(value) + "; expires=" + todayValue.toGMTString() + "; path=/;";
}




const Popup = ({ popupOn, setPopupOn, content }) => {
    const footerClick = () => {
        setCookie(`popup${new Date().yyyymmdd()}`, "end" , 1);
        // 하루동안이므로 1을 설정
        closePopup();
        // 현재 열려있는 팝업은 닫으면서 쿠키값을 저장
    };
    const closePopup = () => {
        setPopupOn(false);
    };
    return (
        <PopupWrapper>
            <Header>
                <span>[공지] 사이트 관리자입니다.</span>
                <button onClick={closePopup}>x</button>
            </Header>
            <Content dangerouslySetInnerHTML={{ __html: content }}>
            </Content>
            <Footer onClick={footerClick}>
                <span>하루동안 열지 않음 [닫기]</span>
            </Footer>
        </PopupWrapper>
    );
};

export default Popup;

const PopupWrapper = styled.div`
    border: 1px solid #c5c5c5;
    border-radius: 3px;
    position: absolute;
    top: 0;
    left: 20%;
    width: 400px;
    height: 300px;
    background-color: white;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Header = styled.header`
    height: 30px;
    padding: 0 4px;
    > span {
        font-size: 14px;
        padding-top: 3px;
        box-sizing: border-box;
    }
    color: #333;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ddd;
    background: #e9e9e9;
    color: #333;
    border-radius: 3px;
`;

const Content = styled.p`
    line-height: 20px;
    height: 80%;
    overflow-y: scroll;
    word-break: break-all;
    padding: 14px 16px;
`;

const Footer = styled.p`
    cursor: pointer;
    padding-right: 10px;
    background-color: #3b568f;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 20px;
    color: white;
    > span {
        font-size: 14px;
        padding-top: 3px;
    }
`;