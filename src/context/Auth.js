import React, { createContext, useState } from 'react';
import ApiDefault from '../components/utils';

const AuthContext = createContext({ 
    state: { logged: false, accessToken: null, refreshToken: null },
    actions: {
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
        try {
            const putAuth = await ApiDefault.put('/auth', undefined, {
                headers: { Authorization: refreshToken }
            })
            localStorage.setItem('accessToken', putAuth.data.accessToken);
            localStorage.setItem('refreshToken', putAuth.data.refreshToken);
            setAccessToken(putAuth.data.accessToken);
            setRefreshToken(putAuth.data.refreshToken);
            return 'success';
        } catch (e) {
            throw new Error(e.response.status);
        }
    };
    React.useEffect(() => {
        IssuingToken().then(res => {
            setLogged(true);
        }).catch(e => {
        })
    }, []);

    const value = {
        state: { logged, accessToken, refreshToken },
        actions: { setLogged, setAccessToken, setRefreshToken, IssuingToken }
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