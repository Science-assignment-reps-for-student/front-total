import React, { createContext, useState, useEffect } from 'react';
import ApiDefault from '../components/utils';

const AuthContext = createContext({ 
    authState: { logged: false, accessToken: null, refreshToken: null },
    authActions: {
        setLogged: () => {},
        setAccessToken: () => {},
        setRefreshToken: () => {},
        IssuingToken: () => {},
    }
});

const AuthProvider = ({ children }) => {
    const [logged, setLogged] = useState(false);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
    const IssuingToken = async () => {
        if (refreshToken === null) return;
        try {
            const putAuth = await ApiDefault.put('/auth', undefined, {
                headers: { Authorization: 'refreshToken' }
            })
            console.log(putAuth);
            localStorage.setItem('accessToken', putAuth.data.accessToken);
            localStorage.setItem('refreshToken', putAuth.data.refreshToken);
            setAccessToken(putAuth.data.accessToken);
            setRefreshToken(putAuth.data.refreshToken);
            return 'success';
        } catch { }
    };
    
    useEffect(() => {
        IssuingToken().then(res => { 
            if (res === 'success')
                ApiDefault.get('user', {
                    headers: {
                        Authorization: accessToken
                    }
                }).then(_ => {
                    setLogged(true);
                }).catch();
        })
    }, []);

    const value = {
        authState: { logged, accessToken, refreshToken },
        authActions: { setLogged, setAccessToken, setRefreshToken, IssuingToken }
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

const { Consumer: AuthConsumer } = AuthContext;

export { AuthProvider, AuthConsumer };

export default AuthContext;