import styled from 'styled-components';

export const BoardInput = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #F8F8F8;
`

export const BoardInputBody = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;    
    flex-wrap: wrap;
    > div {
        > div.imgDiv {
            display: flex;
            justify-content: flex-end;
            width: 450px;
            align-items: center;
            > select {
                width: 100px;
                margin-top: 10px;
            }
            > label {
                margin: 0;
                display: flex;
                text-align: right;
                font-size: 15px;
                color: rgb(255, 87, 0);
                margin-top: 10px;
                > input.img {
                    display: none;
                }
            }
        }
        > h1 {
            font-size: 30px;
            margin: 50px;
            text-align: center;
        }
        > p {
            font-size: 16px;
            font-weight: 600;
            margin: 10px 0px;
        }
        > input {
            width: 450px;
            height: 45px;
            border: 1px solid #858585;
            border-radius: 3px;
            padding-left: 10px;
            box-sizing: border-box;
            font-size: 15px;
            outline: none;
        }
        > textarea {
            width: 450px;
            min-height: 300px;
            border: 1px solid #858585;
            border-radius: 3px;
            font-size: 15px;
            padding-left: 10px;
            box-sizing: border-box;
            resize: none;
            outline: none;
        }
        > div.img {
            width: 450px;
            max-height: 500px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            overflow: scroll;
            > div {
                width: auto;
                height: auto;
            }
        }
        > div {
            display: flex;
            justify-content: center;
            > div {
                width: 100px;
                height: 38px;
                border-radius: 2px;
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 20px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
            }
            > div.upload {
                background-color: #FF5700;
            }
            > div.cancel {
                background-color: #858585;
            }
        }
    }
`

export const BoardInputImg = styled.div`
    max-width: 400px;
    position: relative;
    > img {
        border-radius: 3px;
        max-width: 400px;
    }
    > div {
        right: 10px;
        top: 10px;
        position: absolute;
        width: 20px;
        height: 20px;
        cursor: pointer;
        > .mdiv {
        height: 20px;
        width: 2px;
        background-color: black;
        transform: rotate(45deg);
        Z-index: 1;
            > .md {
            height: 20px;
            width: 2px;
            background-color: black;
            transform: rotate(90deg);
            Z-index: 2;
            }
        }
    }

`