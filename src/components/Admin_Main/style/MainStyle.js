import styled from 'styled-components';

export const MainDiv = styled.div`  
    width: 98vw;
    padding: 1vw;
    display:flex;
    &::-webkit-scrollbar {
        display: none;
    }   
    > div{
        width: 80%;
        height: 88vh;
        overflow-y: scroll;
        overflow-x: hidden;
        > h1 {
            margin-bottom: 25px;
            font-size: 32px;
        }
    }
    > .MainNavDiv {
        width: 20%;
        &::-webkit-scrollbar {
            display: none;
        }
    }
`

export const MainContent = styled.div`
    width: 100%;
    height: ${props => props.isFolder ? "auto" : "75vh"};
    > div {
        display: flex;
        width:100%;
        height: 90%;
        flex-wrap: wrap;
        justify-content: space-around;
        transition-duration: 0.3s;
        > h2 {
            font-size: 20px;
        }
        > div{
            width: 48%;
            height: 50%;
            margin: 0 1% 0 1%;
            > h2 {
                margin: 10px;
                font-size:20px;
            }
        }
        > .buttonWrapper {
            width: ${props => props.button ? 27 : 20}%;
            margin: 0;
            display: flex;
            justify-content: space-around;
        }
    }
    > .classWrapper {
        height: ${props => props.isFolder ? "0px" : "90%"};
        opacity: ${props => props.isFolder ? "0" : "1"};
        display: ${props => props.isFolder ? "none" : "flex"};
    }
    > .wrapper {
        margin: 5px;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`

export const MainClass = styled.div`
    width: 100%;
    height: 85%;
    background: white;
    border: 1px solid #D5D5D5;
    border-radius: 3px;
    > h3 {
        box-sizing: border-box;
        padding: 10px;
        height: 15%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
        > span {
            text-align: right;
        }
    }
    > div{
        width: 100%;
        height: 85%;
        display: flex;
        > div {
        
        }
        > .secondDiv {
            width: 33%;
        }
    }
`

export const MainClassCount = styled.div`
    width: 67%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    > div{
        width: 50%;
        height: 100%;
        > p {
            font-size: 20px;
            font-weight: 600;
            margin: 20px;
            margin-bottom: 10px;
            > span {
                font-size: 20px;
                font-weight: 600;
                margin-left: 30px;
            }
        }
    }
`

export const MainClassCountBar = styled.div`
    width: 80%;
    height: 4px;
    margin: 20px;
    margin-top: 0px;
    background-color: gray;
`

export const MainClassCoutColoredBar = styled.div`
    width: ${props => 100 / props.max * props.count }%;
    height: 4px;
    background: ${props => props.count >= props.max ? "#FF6F61" : "#0073AA"};
`

export const MainListContent = styled.tr`
    background: "white";
    font-size: 14px;
    height: ${props => props.isHeader ? 35 : 25}px;
    &:nth-child(odd){
        background-color: #F5F5F5;
    }
    cursor: pointer;
    > td {
        width: 33%;
    }
`

export const MainButtonDiv = styled.div`
    height: 30%;
    display: flex;
    margin-top:${props => props.margin ? props.margin : 85}px;
    align-items: center;
`

export const MainButton = styled.button`
    width: 190px;
    height: 29px;
    font-weight: 600;
    color: black;
    background-color: white;
    border: 1px solid #858585;
    border-radius: 3px;
    margin-left: 20px;
    > img {
        width: 10px;
        height: 10px;
        margin-right: 10px;
    }
`

export const MainNav = styled.div`
    height: 100%;
    padding-top: 58px;
    box-sizing: border-box;
    &::-webkit-scrollbar {
        display: none;
    }
    > #bar {
        width: 100%;
        height: 1px;
        background: #858585;
    }
    > h2 {
        padding: 10px;
        padding-top: 11px;
    }
`

export const MainClassCheckbox = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    > span {
        font-weight: 600;
        font-size: 13px;
    }
`

export const MainFixButton = styled.button`
    width: 90px;
    height: 35px;
    font-weight: 600;
    font-size: 15px;
    color: black;
    border: none;
    background-color: white;
    border: 1px solid black;
    border-radius: 3px;
    > img {
        width: 15px;
        height: 15px;
        margin-right: 10px;
    }
`

export const MainLoadingContent = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    @keyframes ldio-dlvqi1wu39l {
    0% { transform: rotate(0deg) }
    50% { transform: rotate(22.5deg) }
    100% { transform: rotate(45deg) }
    }
    .ldio-dlvqi1wu39l > div {
    transform-origin: 100px 100px;
    animation: ldio-dlvqi1wu39l 0.2s infinite linear;
    }
    .ldio-dlvqi1wu39l > div div {
        position: absolute;
        width: 22px;
        height: 152px;
        background: #23282d;
        left: 100px;
        top: 100px;
        transform: translate(-50%,-50%);
    }
    .ldio-dlvqi1wu39l > div div:nth-child(1) {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }
    .ldio-dlvqi1wu39l > div div:nth-child(6) {
        width: 80px;
        height: 80px;
        background: #f1f2f3;
        border-radius: 50%;
    }.ldio-dlvqi1wu39l > div div:nth-child(3) {
    transform: translate(-50%,-50%) rotate(45deg)
    }.ldio-dlvqi1wu39l > div div:nth-child(4) {
    transform: translate(-50%,-50%) rotate(90deg)
    }.ldio-dlvqi1wu39l > div div:nth-child(5) {
    transform: translate(-50%,-50%) rotate(135deg)
    }
    .loadingio-spinner-gear-navzgsfup8 {
    width: 200px;
    height: 200px;
    display: inline-block;
    overflow: hidden;
    background: #f1f2f3;
    }
    .ldio-dlvqi1wu39l {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0;
    }
    .ldio-dlvqi1wu39l div { box-sizing: content-box; }
`

export const MainList = styled.div`
    &::-webkit-scrollbar {
    display: none;
    }
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    border-left: 1px solid #858585;
    > table {
        border-collapse: collapse;
        width: 100%;
        text-align: center;
    }
    > p {
        font-size: 15px;
        font-weight: 600;
        margin: 2px;
    }
`

export const MainTeamListContent = styled.tr`
    background-color: ${props => props.color};
    > .status {
        width: 34%;
    }
    > .team {
        width: 66%;
    }
`

