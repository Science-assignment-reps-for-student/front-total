import styled from 'styled-components';

export const Task = styled.main`
    min-width: 1220px;
    min-height: 100vh;
    background-color: #F8F8F8;
    > div.wrapper{
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

export const TaskTop = styled.div`
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
                    cursor: default;
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
                font-size: 15px;
            }
            > div {
                display: flex;
                > img {
                    
                }
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

export  const BoardComment = styled.div`
    width: 100%;
    min-height: 50px;
    border-top: 3px solid #858585;
    margin-bottom: 35px;
`

export const BoardCommentContent = styled.div `
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    > div.comment {
        background-color: white;
        width: 100%;
        min-height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 0.5px solid #858585;
        box-shadow: 1px 1px 2px 0px #858585;
        > img {
            width: 20px;
            height: 20px;
            margin: 10px;
        }
        > p {
            display: flex;
            font-size: 15px;
            width: 80%;
            > span {
                margin: 10px;
                text-align: center;
            }
            > span.name {
                font-weight: 600;
                min-width: 50px;
            }
            > span.content {
                display: block;
            }
        }
        > div {
            width: 18%;
            display:flex;
            justify-content:flex-start;
            > div {
                display: flex;
                color: #858585;
                font-weight: 600;
                font-size: 13px;
                > div {
                    display: flex;
                    align-items: center;
                    > span.delete {
                        border-left: 1px solid #858585;
                        border-right: 1px solid #858585;
                    }
                    > span {
                        cursor: pointer;
                        padding: 0px 5px;
                    }
                }
                > span {
                    margin: 5px;
                }
            }
        }
    }
    > div.children {
        width: 100%;
    }
`

export const BoardCommentInput = styled.div`
    height: 40px;
    width: 100%;
    margin: 10px 0px;
    box-shadow: 0px 0px 5px 0px #858585;
    display: ${props => props.isCheck ? "flex" : "none"};
    > input {
        width: calc(100% - 70px);
        height: 100%;
        border: none;
        outline: none;
        padding: 3px;
        box-sizing: border-box;
        
    }
    > div.button {
        width: 70px;
        height: 100%;
        background-color: black;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

export const BoardInputImg = styled.div`
    max-width: 400px;
    position: relative;
    margin: 10px;
    > img {
        border-radius: 3px;
        max-width: 400px;
    }

`