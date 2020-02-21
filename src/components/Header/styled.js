import styled from 'styled-components';
import Background from './img/Background.png';

const TaskHaeder = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-width: 1220px;
    height: 80px;
    background-image: url(${Background});
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 100;
    overflow: hidden;
    > div {
        &:first-child {
            margin-left: 180px;
        }
        &:last-child {
            margin-right: 180px;
        }
        > a > img {
            width: 100px;
        }
        > ul {
            display: flex;
            justify-content: center;
            > li {
                margin-left: 60px;
                cursor: pointer;
                > a {
                    font-size: 14px;
                    font-weight: bold;
                    color: white;
                    text-decoration: none;
                }
            }
        }
    }
`;
export { TaskHaeder };