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
                <button onClick={closePopup}>x</button>
            </Header>
            <Content dangerouslySetInnerHTML={{ __html: content }}>
            </Content>
            <Footer onClick={footerClick}>
                하루동안 열지 않음 [닫기]
            </Footer>
        </PopupWrapper>
    );
};

export default Popup;

const PopupWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 20%;
    width: 400px;
    height: 300px;
    background-color: white;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Header = styled.header`
    display: flex;
    justify-content: flex-end;
`;

const Content = styled.p`
    line-height: 20px;
    height: 80%;
    overflow-y: scroll;
    word-break: break-all;
`;

const Footer = styled.p`
    cursor: pointer;
    text-align: right;
`;