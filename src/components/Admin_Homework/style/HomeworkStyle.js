import styled from 'styled-components'

export const HomeworkDiv = styled.div`
    width: 1220px;
    height: 95vh;
    background-color:white;
    padding: 50px;
    box-sizing: border-box;
    > h1 {
        font-weight: 600;
        margin-bottom: 24px;
    }
    > div{
        display: flex;
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
    width: 743px;
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
    width: 656px;
    height: 90%;
    font-size: 25px;
    font-weight: 600;
    border: none;
    outline: none;
`

export const HomeworkDay = styled.div`
    width: 240px;
    height: 25px;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #858585;
    box-sizing: border-box;
    padding-left: 20px;
    background: white;
    overflow-wrap: break-word;
    margin-left: 10px;
`

export const HomeworkDayInput = styled.input`
    width: 160px;
    height: 90%;
    outline: none;
    border: none;
    font-size: 14px;
    font-weight: 600;
    margin-left: 10px;
`


export const HomeworkFile = styled.div`
    cursor: default;
    width: 340px;
    height: 80px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border: 1px solid #E1E1E1;
    overflow-y: scroll;
    font-size: 13px;
    font-weight: 600;
    margin-top: 10px;
    &::-webkit-scrollbar {
        display: none;
    }
    > div {
        > img {
            width: 11px;
            height: 11px;
        }
    }
    > p {
        border: 1px solid black;
        font-size: 11px;
        padding: 5px;
        display: flex;
        align-items: center;
        margin: 2px;
        
        > span {
            font-size: 13px;
        }
    }
    > label {
        > input {
            display: none;
        }
    }
`

export const HomeworkExplain = styled.textarea`
    width: 743px;
    height: 451px;
    border: 1px solid #858585;
    resize: none;
    padding: 10px;
    font-size: 13px;
    font-weight: 600;
    box-sizing: border-box;
    outline: none;
`

export const HomeworkNav = styled.div`
    width: 340px;
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
    font-size: 14px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
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