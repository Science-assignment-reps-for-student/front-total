import styled from 'styled-components';
import close from '../img/close.png';

const Task = styled.main`
    min-width: 1220px;
    min-height: 100vh;
    background-color: #F8F8F8;
    > div {
        width: 1020px;
        margin: 0 auto;
        padding: 64px 0;
        > div:first-child {
            margin-bottom: 24px;
            color: #1A1A1A;
            background-color: white;
            box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
        }
    }
`

const TaskTop = styled.div`
    > div.task-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px;
        border-top: 2px solid #858585;
        border-bottom: 1px solid #858585;
        > div {
            display: flex;
            > h1 {
                font-size: 20px;
                margin-right: 10px;
            }
            a {
                align-self: center;
                color: black;
                text-decoration: none;
            }
        } 
        > nav {
            > ul {
                display: flex;
                > li {
                    font-size: 11px;
                    padding: 0 12px;
                    &:first-child {
                        border-right: 1px solid #858585;
                    }
                    &:last-child {
                        border-left: 1px solid #858585;
                    }
                }
            }
        }
    }
    > div.task-desc {
        display: flex;
        position: relative;
        min-height: 300px;
        > div.desc {
            padding: 24px;
            width: 600px;
            > h3 {
                margin-bottom: 8px;
                font-size: 17px;
                color: #FF5700;
            }
            > p {
                line-height: 2;
                font-size: 12px;
            }
        }
        > div.file {
            position: relative;
            flex: 1;
            padding: 24px;
            padding-left: 140px;
            > div.file-input {
                display: flex;
                justify-content: center;
                > a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 50%;
                    padding: 8px 24px;
                    border: 1px solid #1A1A1A;
                    border-radius: 4px;
                    cursor: pointer;
                    > span {
                        font-size: 13px;
                        font-weight: bold;
                    }
                }
            }
            > div.file-img {
                > img {
                    position: absolute;
                    bottom: 12px;
                }
            }
        }
    }
`;

const TaskBottom = styled.div`
    display: flex;
    justify-content: space-between; 
    background-color: #F8F8F8;
    box-shadow: none;
    h5 {
        margin: 0;
        padding: 0;
    }
    > div {
        width: 47%;
        border-top: 3px solid #858585;
        background-color: white;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
        > div.submit--title, > div.show--title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 24px 24px;
            border-bottom: 1px solid #858585;
            > h4 {
                font-size: 20px;
            }
        }
    }
    > div.task-bottom-left {
        display: flex;
        flex-direction: column;
        > div.show--title {
            > input {
                padding: 4px 8px;
                outline: none;
            }
            > button {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 6px 32px;
                border: 1px solid #1A1A1A;
                border-radius: 4px;
                background-color: white;
                cursor: pointer;
                > span {
                    margin-left: 4px;
                    font-size: 13px;
                    font-weight: bold;
                }
            }
            a {
                padding: 8px;
                border: 1px solid #2E2E2E;
                border-radius: 8px;
                font-weight: bold;
                font-size: 12px;
            }
            a:hover {
                color: white;
                background-color: #2E2E2E;
                transition: 0.3s ease-in-out;
            }
        }
        > div.show--list {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            max-height: 300px;
            > .file-wrap {
                flex: 1;
                max-height: 300px;
                overflow: scroll;
                &::-webkit-scrollbar {
                    width: 4px;
                }
                &::-webkit-scrollbar-thumb {
                    border-radius: 8px;
                    background-color: #FF5700;
                }
                > ul {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: flex-start;
                    justify-content: flex-start;
                    
                    > li {
                        width: 25%;
                        height: 50px;
                        line-height: 1.5;
                        padding: 0 12px;
                        border-left: 1px solid #2E2E2E;
                        text-align: center;
                        &:first-child {
                            color: #FF5700;
                        }
                    }
                }
                > div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    > div {
                        line-height: 2;
                        padding: 8px 12px;
                        text-align: center;
                        background-color: #F2F2F2;
                        > h6 { font-size: 16px; }
                        > p {
                            font-size: 12px;
                            > span { 
                                font-size: 14px;
                                color: #FF5700;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
    }
    > div.task-bottom-right {
        > div.submit--list > .file-wrap {
            height: 250px;
            overflow-y: scroll;
            > ul > li {
                position: relative;
                padding: 8px 16px;
                > div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 8px 16px;
                    border: 1px solid #1A1A1A;
                    border-radius: 4px;
                    > img {
                        width: 10px;
                        height: 10px;
                        margin-right: 4px;
                    }
                    > span {
                        font-size: 12px;
                        font-weight: bold;
                    }
                }
                > span {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    cursor: pointer;
                }
            }
        } 
        > div.submit--buttons {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 24px 0;
            button {
                width: 45%;
                margin: 0;
                padding: 4px 8px;
                border: 0;
                border-radius: 4px;
                font-size: 14px;
                font-weight: bold;
                cursor: pointer;
            }
            button:first-child {
                color: #F8F8F8;
                background-color: #1A1A1A;
                > label {
                    display: block;
                    cursor: pointer;
                }
                > input {
                    display: none;
                }
            }
            button.notOnFiles {
                color: white;
                background-color: #858585;
            }
            button.onFiles {
                color: #1A1A1A;
                background-color: #FF5700;
            }
        }
    }
    a {
        color: black;
        text-decoration: none;
    }
`;

const TaskTeamModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(112, 112, 112, 0.48) !important;
    > div.team-member--background {
        width: inherit;
        height: inherit;
    }
    > div.team-member--editer {
        display: flex;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 0;
        border-radius: 4px;
        background-color: white;
        > div.editer--searching {
            padding: 24px 0 0 12px;
            width: 450px;
            > div.editer--searching_li {
                    height: 350px;
                    overflow-y: scroll;
                    &::-webkit-scrollbar {
                        width: 4px;
                    }
                    &::-webkit-scrollbar-thumb {
                        border-radius: 8px;
                        background-color: #FF5700;
                    }
                    > ul {
                        > li {
                            padding: 8px 0;
                            font-size: 12px;
                            transition: 0.25s;
                            cursor: pointer;
                            > span {
                                display: inline-block;
                            }
                            > span:first-child {
                                width: 300px;
                            }
                        }
                        > li:first-child {
                            font-weight: bold;
                            margin-bottom: 12px;
                        }
                        > li:not(:first-child).clicked {
                            transition: 0.25s;
                            background-color: #858585 !important;
                        }
                        > li:nth-child(2n + 1):not(:first-child) {
                            background-color: #F8F8F8;
                        }
                    }
                }
            }
        > div.editer--members {
            position: relative;
            width: 350px;
            > div:first-child {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px 24px;
                border-radius: 0 4px 0 0;
                font-size: 20px;
                background-color: #F8F8F8;
                > img {
                    width: 16px;
                    height: 16px;
                    cursor: pointer;
                }
            }
            > div:nth-child(2) {
                max-height: 340px;
                padding: 0 12px;
                overflow: scroll;
                &::-webkit-scrollbar {
                    width: 4px;
                }
                &::-webkit-scrollbar-thumb {
                    border-radius: 8px;
                    background-color: #FF5700;
                }
                > ul {
                    > li {
                        margin-bottom: 8px;
                        padding: 12px;
                        font-size: 14px;
                        > span {
                            display: inline-block;
                            width: 95px;
                            > i {
                                display: inline-block;
                                width: 10px;
                                height: 10px;
                                background-image: url(${close});
                                background-size: contain;
                                background-repeat: no-repeat;
                                background-position: center;
                                cursor: pointer;
                            }
                        }
                        &:not(:first-child) > span:last-child {
                            text-align: right;
                        }
                    }
                    > li:first-child {
                        font-weight: bold;
                    }
                }
            }
            > button {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 50px;
                border: 0;
                border-radius: 0 0 4px 0;
                background-color: #FF5700;
                color: #1A1A1A;
                font-weight: bold;
                font-size: 17px;
                cursor: pointer;
            }
        }
    }
`;

export { TaskTop, TaskBottom, TaskTeamModal, Task };