import styled from 'styled-components'

export const LoginBackground = styled.div`
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

export const LoginHeader = styled.div`
    margin-top:2px;
    position:absolute;
    width:100%;
    display:flex;
    align-self: flex-start;
    justify-content: center;
    > div {
        width: 98%;
        display: flex;
        justify-content: space-between;
        > p {
            font-size: 18px;
            color: white;
            font-weight: 100;
            > span{
                font-size: 19px;
                font-weight:500;
            }
        }
        > #bookmark {
            color:white;
            font-weight: 600;
            > div{
                width: 54px;
                height: 4px;
                background-color: white;
                margin-top: 8px;
            }
        }
    }
`

export const LoginDiv = styled.div`
    width: 442px;
    height: 539px;
    background: white;
    border-radius:3px;
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    > p{
        align-self:flex-end;
        margin-bottom:10px;
        font-size:18px;
        color: #0073AA;
        font-weight:100;
        > span{
            font-size: 19px;
            font-weight: 400;
            margin-right: 10px;
        }
    }
    > div{
        > p{
            font-size: 13px;
            text-align: center;
            font-weight: 600;
            margin-top: 10px;
        }
        margin-top:100px;
        > h1{
            width: 100%;
            text-align: center;
            font-weight: 600;
            font-size: 40px;
            margin-bottom:42px;
        }
        > div{
            > #subTitle{
                font-size:13px;
                font-weight: 550;
                margin-bottom:2px;
            }
        
            > input{
                border:1px solid #858585;
                font-weight: 600;
                width: 365px;
                height: 36px;
                padding-left: 14px;
                outline:none;
                box-sizing: border-box;
                margin-bottom:7px;
            }
        }
    
        > button{
            width: 365px;
            height: 36px;
            font-weight:600;
            font-size:20px;
            color:white;
            background: #1A1A1A;
            border-radius: 2px;
            border:none;
            margin-top:32px;
        }
    }
`