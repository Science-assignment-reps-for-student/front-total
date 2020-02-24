import styled from 'styled-components';

export const ChattingListBackground = styled.div`
    width: 100vw;
    height: 90vh;
    padding: 1vw;
    box-sizing: border-box;
    > h2 {
        margin: 5px 0px 25px 0px;
    }
    > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 80%;
    }
`

export const ChattingListBody = styled.div`
    width: 1010px;
    height: 600px;
    > h1 {
        margin-bottom: 20px;
    }
    > div { 
    width: 100%;
    height: 90%;
    border: 1px solid #858585;
    border-top: 3px solid #858585;
    display: flex;
    overflow-y: scroll; 
        > table {
            background-color: white;
            width: 100%;
            overflow-y: scroll;
            > tbody {
                > tr {
                    border-top: 1px solid #858585;
                    border-bottom: 1px solid #858585;
                    cursor: pointer;
                    > td, th {
                        padding: 25px;
                        text-align: center;
                        > div {
                            width: 18px;
                            height: 18px;
                            border-radius: 9px;
                            background-color: #FF5700;
                            position: absolute;
                            z-index: 100;
                        }
                    }
                    > .number {
                        width: 14%;
                    }
                    > .name {
                        width: 14%;
                    }
                    > .message {
                        width: 40%;
                    }
                    > .date {
                        width: 30%;
                    }
                    > .new { 
                        padding: 0;
                        z-index: 100;
                        position: absolute;
                        display: flex;
                        justify-content: center;
                        margin-top: 20px;
                    }
                }
            }
        }
    }
`