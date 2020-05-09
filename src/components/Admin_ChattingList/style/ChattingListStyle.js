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
    @media ${device.laptop}{
        width: 90%;
    }
    > div { 
        margin-top: 20px;
        width: 100%;
        height: 90%;
        border: 1px solid #858585;
        border-top: 3px solid #858585;
    }
    > div.listHeader {
        margin-top: 0px;
        width: 100%;
        height: auto;
        border: none;
        border-top: none;
        display: flex;
        justify-content: space-between;
        > h2 {
            font-size: 30px;
        }
        > button {
            width: 80px;
            height: 35px;
            background-color: #1D73FF;
            border-radius: 2px;
            font-weight: 600;
            color: white;
            border: none;
            outline: none
        }
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
        cursor: pointer;
    }
`

export const SearchModal = styled.div`
    width: 760px;
    height: 530px;
    border-radius: 8px;
    z-index: 3;
    background-color: white;
    padding: 24px 24px 0px 24px;
    padding-bottom: none;
    box-sizing: border-box;
`

export const SearchModalSearch = styled.div`
    display: flex;
    height: 40px;
    border-radius: 2px;
    margin-bottom: 20px;
    > input {
        width: 230px;
        height: 100%;
        border: 1px solid #858585;
        box-sizing: border-box;
        border-radius: 2px 0px 0px 2px;
        outline: none;
        padding-left: 10px;
        box-sizing: border-box;
    }
    > button {
        width: 78px;
        height: 100%;
        background-color: black;
        color: white;
        border: none;
        border-radius: 0px 2px 2px 0px;
        font-weight: 600;
        outline: none;
    }
`

export const SearchModalNewChatButton = styled.button`
    width: 100px;
    height: 40px;
    background-color: #1D73FF;
    color: white;
    border: none;
    border-radius: 2px;
    font-weight: 600;
    outline: none;
`

export const SearchModalHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
`

export const SearchModalExitButton = styled.div`
    width: 18px;
    height: 18px;
    position: absolute;
    left: 95%;
    > img {
        width: 100%;
        height: 100%;
    }
`

export const SearchModalBackground = styled.div`
    width: 100%;
    height: 100%;
    background-color: #1A1A1A;
    opacity: 0.4;
    display: flex;
    justify-content:center;
    align-items: center;
    position: absolute;
    z-index: 1;
`

export const SearchModalDiv = styled.div`
    width: 100%;
    height: 95%;
    display: flex;
    justify-content:center;
    align-items: center;
    position: absolute;
`

export const SearchModalList = styled.ul`
    list-style: none;
    width: 100%;
    height: calc(100% - 60px);
    overflow-y: scroll;
    > li {
        width: 100%;
        display: flex;
        padding: 15px 0px 15px 0px;
        > div{
            width: 50%;
            font-size:  13px;
        }
        > div.header {
            font-weight: 600;
            font-size: 15px;
        }
    }
    li:nth-child(2n) {
        background-color: #F2F2F2;
    }
`