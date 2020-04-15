import styled from 'styled-components';
import Triangle from '../img/Triangle.png';
import sandClock from '../img/sandClock.png';

const TaskGuide = styled.main`
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
                    &.type, &.submissionStatus { width: 10%; }
                    &.dueDate,  &.creationDate { width: 15%; }
                    &.title { width: 30%; }
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
                            position: absolute;
                            left: 0;
                            top: 50%;
                            transform: translate(-50%,-50%);
                            width: 20px;
                            height: 20px;
                            padding: 8px;
                            border-radius: 50%;
                            background-color: #FF5700;
                            box-shadow: 0 3px 3px rgba(0, 0, 0, 0.12);
                        > i {
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%,-50%);
                            width: 16px;
                            height: 20px;
                            background-image: url(${sandClock});
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
export { TaskGuide };