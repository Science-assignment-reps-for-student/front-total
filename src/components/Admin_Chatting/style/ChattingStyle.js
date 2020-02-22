import styled from 'styled-components';

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
`

export const ChattingBubble = styled.div`
    height: 2vh;
    background-color: ${props => props.type ? "#4898BE" : "#F2F2F2"};
    color: ${props => props.type ? "white" : "black"};
    font-size: 16px;
    font-weight: 600;
    padding: 12px;
    border-radius: 50px;
`

export const ChattingTalk = styled.div`
    width: 100%;
    display: flex;
    justify-content: ${props => props.type ? "flex-end" : "flex-start"};
    > div {
        font-size: 13px;
        font-weight: 600;
        margin: 20px;
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