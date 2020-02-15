import styled from 'styled-components';

const PeerEvaluation = styled.main`
    width: 1220px;
    margin: 48px auto;
    > div {
        width: 820px;
        margin: 0 auto;
        box-shadow: 0 10px 5px rgba(0, 0, 0, 0.2);
    }
    > div > h2 {
        border-top: 2px solid #858585;
        border-bottom: 1px solid #858585;
        padding: 24px 32px;
        font-size: 22px;
    }
    > div > section {
        padding: 16px 64px;
        > div {
            margin: 16px 0;
            h4 {
                padding-bottom: 8px;
                border-bottom: 2px solid #858585;
                font-size: 12px;
            }
            > ul > li:first-child > ul {
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
        }
        > div.evaluation-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            > h3 { font-size: 22px; }
            > span { 
                font-size: 12px;
                font-weight: bold;
            }
        }
        > div.evaluation-submit {
            text-align: right;
            > button {
                margin: 0;
                padding: 6px 64px;
                border: 0;
                border-radius: 8px;
                color: #1A1A1A;
                background-color: #FF5700;
                font-size: 12px;
                font-weight: bold;
                cursor: pointer;
            }
        }
        ul.evaluation-level {
            font-size: 12px;
            font-weight: bold;
            > li {
                margin: 4px;
            }
        }
        p.evaluated-name {
            color: #FF5700;
            font-weight: bold;
        }
    }
`;

const InputList = styled.div`
    display: flex;
    > div:first-child {
        width: 70%;
        margin: 12px 0;
        > h5 {
            margin-bottom: 8px;
            font-size: 14px;
        }
        > pre {
            line-height: 1.5;
            font-size: 12px;
            font-family: 'Roboto';
            word-break: break-all;
            white-space: pre-wrap;
        }
    }
    > div:last-child {
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    input {
        margin: 0 12px;
    }
`;

export { PeerEvaluation, InputList };