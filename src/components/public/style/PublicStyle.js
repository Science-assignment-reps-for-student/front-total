import styled from 'styled-components'

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

export const device = {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
    laptopL: `(max-width: ${size.laptopL})`,
    desktop: `(max-width: ${size.desktop})`,
    desktopL: `(max-width: ${size.desktop})`
};

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
    background-image: url(${props => props.src});
    background-repeat:no-repeat;
    background-position:center;
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
            width: 20vw;
            @media ${device.laptop} {
                width: 30vw;
            }
            text-align: center;
            font-size: 20px;
            color:white;
            font-weight: 100;
            cursor: pointer;
            > span {
                font-weight: 600;
            }
        }
        
        > div {
            width: 20vw;
            @media ${device.laptop} {
                width: 30vw;
            }
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
        transform: translateY(1vh);
    }
    > .check {
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: #FF5700;
        position: absolute;
        transform: translate(32px,-10px);
    }
`

export const HeaderButtonUnderLine = styled.div`
    width: 100%;
    height: 4px;
    align-self: flex-end;
    background-color: white;
    opacity: ${props => props.hover ? 1 : 0};
`