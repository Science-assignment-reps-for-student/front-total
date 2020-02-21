import styled from 'styled-components';

const QnA = styled.main`
    min-width: 1220px;
    height: calc(100vh - 80px);
    > div {
        height: 100%;
        display: flex;
        flex-direction: column;
        > header {
            padding: 16px 32px;
            box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
            > h1 { font-size: 14px; }
        }
        > section {
            position: relative;
            flex: 1;
            padding: 16px 32px;
            > ul {
                overflow-y: scroll;
                min-height: 520px;
                &::-webkit-scrollbar {
                    width: 4px;
                }
                &::-webkit-scrollbar-thumb {
                    border-radius: 8px;
                    background-color: #FF5700;
                }
                > li {
                    margin-bottom: 4px;
                }
                > li.chat-teacher {
                    > p {
                        margin-bottom: 4px;
                        font-weight: bold;
                        font-size: 10px;
                    }
                    > div {
                        > span {
                            display: inline-block;
                            padding: 8px 12px;
                            border-radius: 16px;
                            background-color: #F2F2F2;
                        }
                    }
                }
                > li.chat-student {
                    > div {
                        text-align: right;
                        > span {
                            display: inline-block;
                            padding: 8px 12px;
                            border-radius: 16px;
                            background-color: #FF8B4E;
                            color: white;
                        }
                    }
                }
            }
            > div.input-wrap {
                
                width: 100%;
                text-align: center;
                border-radius: 16px;
                > div {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-radius: 16px;
                    background-color: #F2F2F2;
                    > div:first-child {
                        flex: 1;
                        padding: 4px 16px;
                        > input {
                            width: 100%;
                            margin: 0;
                            padding: 4px 8px;
                            border: 0;
                            border-radius: 16px;
                            background-color: #F2F2F2;
                            outline: none;
                        }
                    }
                    > div:last-child {
                        padding: 0 8px;
                        > img {
                            width: 16px;
                            height: 16px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
`;

export { QnA };