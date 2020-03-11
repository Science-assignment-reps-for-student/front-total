import styled from 'styled-components';

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

export const device = {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
    laptopL: `(max-width: ${size.laptopL})`,
    desktop: `(max-width: ${size.desktop})`,
    desktopL: `(max-width: ${size.desktop})`
};

export const ChattingMain = styled.div`
    width: 100%;
    height: 95vh;
    background-color: #FFFFFF;
    > .wrapper {
        width: 100%;
        height: 85vh;
        overflow-y: scroll;
        > div {
            overflow-y: hidden;
        }
    }
    > .error {
        width: 100%;
        height: 5vh;
        background-color: #ff3030;
        position: absolute;
        left: 0;
        transition: 0.7s;
        text-align: center;
        line-height: 5vh ;
        color: #FFF;
        transform: ${props => props.error ? "translate(0px, 0px)" : "translate(0px, -5vh)"};
    }
`

export const ChattingSubHeader = styled.div`
    width: 100%;
    height: 5vh;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 20px;
    padding-left: 30px;
    box-shadow: 0 2px 2px -2px gray;
    box-sizing: border-box;
    z-index: 100;
    position: relative;
    background-color: white;
`

export const ChattingBubble = styled.div`
    word-break: break-all;
    min-height: 2vh;
    background-color: ${props => props.type ? "#4898BE" : "#F2F2F2"};
    color: ${props => props.type ? "white" : "black"};
    font-size: 16px;
    font-weight: 600;
    padding: 12px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ChattingTalk = styled.div`
    width: 100%;
    display: flex;
    justify-content: ${props => props.type ? "flex-end" : "flex-start"};
    > div {
        font-size: 13px;
        font-weight: 600;
        margin: 20px;
        max-width: 40%;
        > span {
            margin-top: 5px;
        }
    }
`

export const ChattingTypeInput = styled.div`
    width: 80%;
    height: 90%;    
    border-radius: 50px;
    background-color: #F2F2F2;
    padding-left: 20px;
    display: flex;
    align-items: center;
    > input {
        width: 97%;
        height: 85%;
        background-color: #F2F2F2;
        border: none;
        outline: none;
        font-size: 16px;
        font-weight: 600;
    }
    > img {
        width: 25px;
        height: 25px;   
    }
`

export const ChattingType = styled.div`
    width: 100%;
    height: 5vh;
    align-self: flex-end;
    display: flex;
    justify-content: center;
`