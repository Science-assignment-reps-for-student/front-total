import React, { 
    useState, 
    useCallback 
} from 'react';
import * as S from './style/LoginStyle';
import background from './imgs/background.png';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { 
    setLocalStorage, 
    setContext 
} from '../resource/publicFunction';
import { LoginServerURL } from '../resource/serverURL.js';

const AdminLogin = ({ actions, history }) => {
    const [id,idChange] = useState();
    const [pw,passwordChange] = useState();
    const [error,errorChange] = useState(false);

    const idChangeHandler = useCallback((e) => {
        idChange(e.target.value);
    },[]);

    const passwordChangeHandler = useCallback((e) => {
        passwordChange(e.target.value);
    },[]);

    const loginRequest = useCallback((userEmail,userPw,actions) => {
        const data = {
            userEmail,
            userPw,
        };
        axios.post(LoginServerURL, data)
        .then((e)=> {
            const accessToken = e.data.accessToken;
            const refreshToken = e.data.refreshToken;
            setLocalStorage(accessToken,refreshToken);
            setContext(accessToken,refreshToken,actions);
            history.push('/Admin');
        })
        .catch((e)=> {
            errorChange(true);
        });
    },[history])

    const keyboardEnterHandler = useCallback(
        ({key}) => {
        if(key === "Enter"){
            loginRequest(id,pw,actions);
        }
    },[actions, loginRequest, id, pw])


    return (
        <>
            <S.LoginBackground src={background}>
                <S.LoginHeader>
                    <div>
                        <p>
                            <span>SCARF </span>
                            Admin console
                        </p>
                        <p id="bookmark">
                            로그인
                        </p>
                        
                    </div>
                </S.LoginHeader>
                <S.LoginDiv>
                    <div>
                        <h1 id="title">LOGIN</h1>
                        <div>
                            <p id="subTitle">Admin id</p>
                            <input type="text" placeholder="ID" onChange={idChangeHandler} onKeyPress={keyboardEnterHandler}/>
                        </div>
                        <div>
                            <p id="subTitle">Password</p>
                            <input type="password" placeholder="PASSWORD" onChange={passwordChangeHandler} onKeyPress={keyboardEnterHandler}/>
                        </div>
                        <button onClick={()=> {loginRequest(id,pw,actions)}}>로그인</button>
                        {
                            error ? <p>아이디나 비밀번호를 확인해 주세요.</p> : ""
                        }
                    </div>
                    <p><span>SCARFS</span>Admin console</p>
                </S.LoginDiv>
            </S.LoginBackground>
        </>
    )
}

export default withRouter(AdminLogin);