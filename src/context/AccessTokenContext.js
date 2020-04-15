import React, { createContext, useState } from 'react';

const AccessTokenContext = createContext({
    state: {
        accessToken: "",
        refreshToken: "",
    },
    actions: {
        accessTokenChange: ()=> {},
        refreshTokenChange: () => {},
    }
});

const AccessTokenProvider = ({ children }) => {

    const accessBuffer = localStorage.getItem('accessToken');
    const refreshBuffer = localStorage.getItem('refreshToken');
    const [accessToken,accessTokenChange] = useState(accessBuffer);
    const [refreshToken,refreshTokenChange] = useState(refreshBuffer);

    const value = {
        state: {
            accessToken: accessToken,
            refreshToken: refreshToken,
        },
        actions: {
            accessTokenChange: accessTokenChange,
            refreshTokenChange: refreshTokenChange,
        }
    }
    return (
        <AccessTokenContext.Provider value={value}>
            {children}
        </AccessTokenContext.Provider>
    )
}

const { Consumer: AccessTokenConsumer } = AccessTokenContext;

export { AccessTokenProvider, AccessTokenConsumer };
export default AccessTokenContext;