import styled from 'styled-components';

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

export const HomeworkDiv = styled.div`
    width: 70%;
    @media ${device.laptop} {
        width: 90%;
    }
    height: 95vh;
    background-color:white;
    padding: 50px;
    box-sizing: border-box;
    > h1 {
        font-weight: 600;
        margin-bottom: 24px;
        font-size: 30px;
    }
    > div{
        display: flex;
        width: 100%;
    }
    > .wrapper {
        height: 90%;
    }
`

export const HomeworkButtonDiv = styled.div`
    width: 100%;
    height: 36px;
    background: #E1E1E1;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
`

export const HomeworkButton = styled.div`
    width: 92px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    > img {
        width: 16px;
        height: 16px;
    }
    > p {
        margin-left: 10px;
        font-size: 13px;
        font-weight: 600;
    }
`

export const HomeworkMain = styled.div`
    width: 70%;
    margin-right: 50px;
    > h2 {
        margin-bottom: 12px;
    }
    > #wrapper {
        display: flex;
    }
`

export const HomeworkTitle = styled.div`
    width: 100%;
    height: 62px;
    border: 1px solid #858585;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
`

export const HomeworkDropdown = styled.div`
    width: 72px;
    height: 62px;
    font-size: 13px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    > i {
        border: solid black;
        border-width: 0 1px 1px 0;
        display: inline-block;
        padding: 3px;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
    }
    > p{
        width: 60px;
        overflow-wrap: break-word;
        text-align: center; 
    }
`

export const HomeworkDropdownContentWrapper = styled.div`
    position: absolute;
    display: ${props => props.hover ? 'block' : 'none'};
    transform: translateY(-12px);
`

export const HomeworkDropdownContent = styled.div`
    height: 32px;
    background: #E1E1E1;
    font-size: 13px;
    font-weight: 600;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

export const HomeworkTitleInput = styled.input`
    width: 88%;
    height: 90%;
    font-size: 25px;
    font-weight: 600;
    border: none;
    outline: none;
`

export const HomeworkDay = styled.div`
    width: 85%;
    height: 25px;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #858585;
    box-sizing: border-box;
    background: white;
    overflow-wrap: break-word;
    margin-left: 10px;
    max-width: 230px;
`

export const HomeworkDayInput = styled.input`
    width: 69%;
    height: 90%;
    outline: none;
    border: none;
    font-size: 14px;
    font-weight: 600;
`


export const HomeworkFile = styled.label`
    cursor: default;
    width: 100%;
    height: 80px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border: 1px solid #E1E1E1;
    overflow-y: scroll;
    font-size: 13px;
    font-weight: 600;
    margin-top: 10px;
    &::-webkit-scrollbar {
        display: none;
    }
    > div {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        > div {
            display: flex;
            justify-content: center;
            width: 100%;
            > img {
                width: 11px;
                height: 11px;
            }
        }
    }
    > input {
        display: none;
    }
    > label {
        > p {
            > div {
                border: 1px solid black;
                font-size: 11px;
                padding: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 2px;
                width: auto;
                overflow-wrap: break-word; 
                
                > span {
                    font-size: 13px;
                    margin: 2px;
                }
            }
        }
        > input {
            display: none;
        }
    }
`

export const HomeworkExplain = styled.textarea`
    width: 100%;
    height: 70%;
    border: 1px solid #858585;
    resize: none;
    padding: 10px;
    font-size: 15px;
    font-weight: 600;
    box-sizing: border-box;
    outline: none;
`

export const HomeworkNav = styled.div`
    width: 30%;
    font-size: 14px;
    font-weight: 600;
    > p {
        margin-bottom: 30px;
    }
`

export const HomeworkLine = styled.div`
    width: 100%;
    height: 1px;
    background: #D5D5D5;
`

export const HomeworkCheckBox = styled.div`
    font-size: 12px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    display: flex;
    justify-content: center;
`

export const HomeworkFileLabel = styled.div`
    cursor: pointer;
    width: 100%;
    display: flex;  
    justify-content: center;
    text-align: center;
    > div {
        margin: 5px;
    }
    > label {
        > div{
            margin: 5px;
            cursor: pointer;
        }
        >input {
            display: none;
        }
    }
`