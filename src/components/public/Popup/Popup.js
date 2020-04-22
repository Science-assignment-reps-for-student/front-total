import React, { useCallback } from 'react';
import styled from 'styled-components';

const time = new Date();
function setCookie(cname, value, expire) {
    var todayValue = new Date();
    todayValue.setDate(todayValue.getDate() + expire);
    document.cookie = cname + "=" + encodeURI(value) + "; expires=" + todayValue.toGMTString() + "; path=/;";
}




const Popup = ({ popup, setPopupOn, notice }) => {
    const footerClick = () => {
        setCookie(`popup${new Date().yyyymmdd()}`, "end" , 1);
        // 하루동안이므로 1을 설정
        closePopup();
        // 현재 열려있는 팝업은 닫으면서 쿠키값을 저장
    };
    const closePopup = () => {
        setPopupOn(false);
    };
    const script = React.useMemo(() => {
        if (notice) {
            const content = notice.notice;
            const indexOfTag = content.indexOf('<script>') + 8;
            const lastIndexOfTag = content.indexOf('</script>');
            return content.slice(indexOfTag, lastIndexOfTag);
        }
    }, [notice]);
    return (
            <PopupWrapper>
                <Header>
                    <span dangerouslySetInnerHTML={{ __html: notice.noticeTitle }}></span>
                    <button onClick={closePopup}>x</button>
                </Header>
                <Content dangerouslySetInnerHTML={{ __html: notice.notice }}>
                </Content>
                <Footer onClick={footerClick}>
                    <span>하루동안 열지 않음 [닫기]</span>
                </Footer>
                {script && window.eval(script)}
            </PopupWrapper>
    );
};

export default Popup;

const PopupWrapper = styled.div`
    border: 1px solid #c5c5c5;
    border-radius: 3px;
    position: absolute;
    top: 6%;
    left: 20%;
    width: 600px;
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
        box-sizing: border-box;
    }
    > button {
        background-color: white;
        outline: none;
        cursor: pointer;
        border: 1px solid rgb(197, 197, 197);
        border-radius: 6px;
        padding-bottom: 4px;
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
        height: 100%;
        padding-top: 3px;
    }
`;