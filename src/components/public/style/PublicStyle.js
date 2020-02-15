import styled from 'styled-components'

export const Background = styled.div`
    background-image: url(${props => props.src});
    background-repeat:no-repeat;
    background-position:center;
    height:100vh;
    width:100%;
    position:absolute;
    background-color:#23282D;
    z-index:-1;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-wrap:wrap;
`

export const BackgroundWhite = styled.div`
    width: 100%;
    position: absolute;
    background-color: #F5F5F5;
    z-index: -1;
    min-height: 95vh;
`

export const Header = styled.div`
    width: 100%;
    height: 5vh;
    background-color: #23282D;
    display:flex;
    justify-content: space-between;
    > div {
        display: flex;
        align-items: center;
        height: 100%;
        > #title {
            width: 350px;
            text-align: center;
            font-size: 20px;
            color:white;
            font-weight: 100;
            > span {
                font-weight: 600;
            }
        }
        
        > div {
            width: 260px;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        > #logOut {
            justify-content: center;
        }
    }
    `

export const HeaderButton = styled.div`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    color: #858585;
    transition: all 0.1s;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        color: white;
    }
    > p {
        transform: translateY(8px);
    }
`

export const HeaderButtonUnderLine = styled.div`
    width: 100%;
    height: 4px;
    align-self: flex-end;
    background-color: white;
    opacity: ${props => props.hover ? 1 : 0};
`