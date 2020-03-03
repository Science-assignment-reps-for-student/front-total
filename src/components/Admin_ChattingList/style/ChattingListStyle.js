import styled from 'styled-components';

export const ChattingListBackground = styled.div`
    width: 100vw;
    height: 90vh;
    padding: 1vw;
    box-sizing: border-box;
    > h2 {
        margin: 5px 0px 25px 0px;
        font-size: 30px;
    }
    > .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 90%;
    }
`

export const ChattingListBody = styled.div`
    width: 65%;
    height: 100%;
    > div { 
        margin: 20px;
        width: 100%;
        height: 90%;
        border: 1px solid #858585;
        border-top: 3px solid #858585;
    }
`

export const ChattingListComponent = styled.div`
    width: 100%;
    height: 12.5%;
    border-bottom: 1px solid #858585;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-weight: ${props => props.isHeader ? "600" : ""};
    > div {
        width: 20%;
        text-align: center;
    }
    > .alarm {
        width: 17px;
        height: 17px;
        background-color: #FF5700;
        border-radius: 9px;
        position: absolute;
        transform: translateX(-8px);
    }
    > .text {
        width: 40%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
`


export const ChattingListButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
        padding: 5px;
        margin: 1px;
        border: 1px solid #858585;
    }
`