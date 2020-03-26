import styled from 'styled-components';
import Triangle from '../img/Triangle.png';
import New from '../img/New.png'

export const BoardMain = styled.div`
    width: 100%;
    height: calc(100vh - 80px);    
`;

export const BoardGuide = styled.main`
    min-height: 100vh;
    min-width: 1220px;
    background-color: #F8F8F8;
    > div {
        width: 1020px;
        margin: 0 auto;
        padding: 64px 0;
        > div {
            width: 100%;
        }
        > div.task-guide-top {
            display: flex;
            justify-content: space-between;
            > h1 {
                font-size: 32px;
            }
            > div {
                display: flex;
                align-items: center;
                > div {
                    height: 30px;
                    > input, > button {
                        height: 100%;
                        margin: 0;
                        padding: 0 16px;
                        border: 1px solid #858585;
                    }
                    > input {
                        width: 230px;
                        box-sizing: border-box;
                    }
                    > button {
                        color: #F8F8F8;
                        background-color: #1A1A1A;
                        cursor: pointer;
                    }
                }
                > div.button {
                    margin-left: 10px;
                    width: 100px;
                    background-color: #1A1A1A;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                }
            }
        }
        > div.task-guide-table {
            width: 1020px;
            margin: 0 auto;
            padding-top: 32px;
            > table {
                width: inherit;
                border-top: 2px solid #858585;
                background-color: white;
                box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
            }
            tr {
                position: relative;
                > th {
                    border-top: 1px solid #858585;
                    border-bottom: 1px solid #858585;
                    padding: 15px 0;
                    font-size: 13px;
                    &.write, &.viewCount, &.comment { width: 10%; }
                    &.creationDate { width: 15%; }
                    &.title { width: 55%; }
                }
                > td {
                    position: relative;
                    text-align: center;
                    font-size: 13px;
                    padding: 20px 0;    
                    border-bottom: 1px solid #858585;
                    a {
                        color: black;
                        text-decoration: none;
                    }
                    &:nth-child(2) {
                        > span {
                            display: block;
                            cursor: pointer;
                            a {
                                display: block;
                                width: 340px;
                                margin: auto;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                    &.urgent { color: #FF5700; }
                    &.relaxed { color: #1D73FF; }
                    > img {
                        width: 12px;
                        height: 12px;
                    }
                    > div { 
                        width: 36px;
                        height: 36px;
                        position: absolute;
                        background-color: #FF5700;
                        border-radius: 24px;
                        left: -18px;
                        top: 9px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        > i {
                            position: absolute;
                            width: 20px;
                            height: 14px;
                            background-image: url(${New});
                            background-position: center;
                            background-repeat: no-repeat;
                            background-size: contain;
                        }
                    }
                }
            }
        }
        div.task-guide-page {
            > ul {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 32px;
                > li {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 25px;
                    height: 25px;
                    margin: 0 4px;
                    font-size: 12px;
                    cursor: pointer;
                    &.clicked {
                        border: 1px solid #2E2E2E;
                        background-color: #FFFFFF;
                    }
                }
                > li > i {
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    background-image: url(${Triangle});
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;
                }
                > li:last-child > i {
                    transform: rotate(180deg);
                }
            }
        }
    }
`;