import styled from 'styled-components';
import toolsBack from '../img/tools-864983_1920.png';

export const FixingBody = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    background-image: url(${toolsBack});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    > div button {
        padding: 12px;
        border: 1px solid black;
        border-radius: 16px;
        background-color: white;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        outline: none;
    }
    > div button:active {
        border: 1px solid #707070;
    }
    @media all and (max-width: 500px) {
        > div {
            font-size: 10px;
        }
        > div button {
            font-size: 8px;
            padding: 4px;
        }
    }
`

export const FixingTitle = styled.p`
    font-size: ${(props) => props.fontSize}px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30px;
    @media all and (max-width: 500px) {
        font-size: 16px;
    }
`