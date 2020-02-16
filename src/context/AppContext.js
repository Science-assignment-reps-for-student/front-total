import React, { createContext, useState } from 'react'

// 약간 기본형식 잡아주는 듯?
const TaskContext = createContext({
    state: {
        accessToken: "",
        refreshToken: "",
        wooServer: "",
        limServer: "",
    },
    taskActions: {
        accessTokenChange: () => { },
        refreshTokenChange: () => { },
        setWooServer: () => { },
        setLimServer: () => { },
    }
});

// 실제 사용
const TaskProvider = ({ children }) => {
    const [accessToken, accessTokenChange] = useState(localStorage.getItem("accessToken"));
    const [refreshToken, refreshTokenChange] = useState(localStorage.getItem("refreshToken"));
    const [wooServer, setWooServer] = useState("http://54.180.174.253/t-bone");
    const [limServer, setLimServer] = useState("http://54.180.174.253/chuckflap");

    const value = {
        state: {
            accessToken: accessToken,
            refreshToken: refreshToken,
            wooServer: wooServer,
            limServer: limServer,
        },
        taskActions: {
            accessTokenChange: accessTokenChange,
            refreshTokenChange: refreshTokenChange,
            setWooServer: setWooServer,
            setLimServer: setLimServer,
        }
    }
    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
};

const { Consumer: TaskConsumer } = TaskContext;

export { TaskProvider, TaskConsumer };
export default TaskContext;