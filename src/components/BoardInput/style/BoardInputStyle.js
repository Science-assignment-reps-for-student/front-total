import styled from 'styled-components';

export const BoardInput = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #F8F8F8;
`

export const BoardInputBody = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;    
    flex-wrap: wrap;
    > div {
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