import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import { PeerEvaluation, Task, TaskGuide, AdminLogin, Homework, AdminMain, Main, QnA, AdminChatting, ChattingList } from './components';
import { AuthConsumer, AuthProvider } from './context/Auth';
import { TaskProvider, TaskConsumer } from './context/AppContext';
import { AccessTokenProvider, AccessTokenConsumer } from './context/AccessTokenContext';
import Global from './styled';
import axios from 'axios';

const App = () => {
    const history = useHistory();
    const [members, setMembers] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const [homeworkData, setHomeworkData] = useState({});
<<<<<<< Updated upstream
    const [stompState, setStompState] = useState(undefined);
    const [usableSocket, SetUsableSocket] = useState(false);    
    const [buffer, setBuffer] = useState({
        chat: {},
        scroll: 0
    });
=======
>>>>>>> Stashed changes

    const setHomework = useCallback((data) => { setHomeworkData(data) }, []);
    const setHomeworkDataInState = useCallback((wooServer, accessToken, homeworkId) => {
        if (homeworkId === "undefined") return;
        else {
            axios.get(`${wooServer}/homework/${homeworkId}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                }
            }).then((response) => {
                setHomework(response.data);
            }).catch((error) => {
                if (typeof error.response === "undefined") return;
                const code = error.response.status;
                if (code === 401 || code === 410)
                    history.push("/");
            })
        }
    }, []);
    const getUserInfo = useCallback((limServer, accessToken) => {
        if (typeof accessToken === "object") return;
        return axios.get(`${limServer}/user`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        })
    }, []);

    useEffect(() => {
<<<<<<< Updated upstream
        if (isLogin || localStorage.getItem("accessToken") !== null) {
            axios.get("https://api.dsm-scarfs.hs.kr/chuckflap/message", {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }).then(e => {
                getUserInfo("https://api.dsm-scarfs.hs.kr/chuckflap", localStorage.getItem("accessToken"))
                    .then(e => {
                        setMy(e.data);
                    })
                setSocket();
            }).catch(err => {
                const code = err.response.status;
                if (code == 403) {
                    alert("로그인을 해주시길 바랍니다.");
                    history.push("/");
                }
            })
        }
    }, [isLogin]);
    useEffect(() => {
        if (stompState && my.userId) {
            stompState.onConnect = () => {
                SetUsableSocket(true);
                stompState.subscribe(`/receive/${my.userId}`, (msg) => {
                    setBuffer({ ...buffer, chat: JSON.parse(msg.body) });
                    scrollBufChange();
                });
            }
=======
        if (localStorage.getItem("accessToken")) {
            setIsLogin(true);
>>>>>>> Stashed changes
        }
    }, []);

    return (
        <Switch>
            <TaskProvider>
                <TaskConsumer>
                    {
                        ({ taskActions, taskState }) => {
                            return (
                                <>
                                    <Global />
                                    <Route
                                        path="/qna"
                                        render={() =>
                                            <QnA
                                                state={taskState}
                                                isLogin={isLogin}
                                                actions={taskActions}
                                                getUserInfo={getUserInfo}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/task/:homeworkId/evaluation"
                                        render={() =>
                                            <PeerEvaluation
                                                state={taskState}
                                                members={members}
                                                setMembers={setMembers}
                                                getUserInfo={getUserInfo}
                                                taskActions={taskActions}
                                                homeworkData={homeworkData}
                                                setHomeworkDataInState={setHomeworkDataInState}
                                            />
                                        }
                                    />
                                    <Route
                                        exact
                                        path="/task/:homeworkId"
                                        render={() =>
                                            <Task
                                                state={taskState}
                                                members={members}
                                                setMembers={setMembers}
                                                getUserInfo={getUserInfo}
                                                taskActions={taskActions}
                                                homeworkData={homeworkData}
                                                setHomeworkDataInState={setHomeworkDataInState}
                                            />
                                        }
                                    />
                                    <Route
                                        exact
                                        path="/task"
                                        render={() =>
                                            <TaskGuide
                                                state={taskState}
                                                getUserInfo={getUserInfo}
                                                setHomework={setHomework}
                                                taskActions={taskActions}
                                                setHomeworkDataInState={setHomeworkDataInState}
                                            />
                                        }
                                    />
                                    <AccessTokenProvider>
                                        <AccessTokenConsumer>
                                            {
                                                ({ actions, state }) => {
                                                    return (
                                                        <>
                                                            <Route path="/admin/login" render={() => <AdminLogin actions={actions} />} />
                                                            <Route path="/admin/make" render={() => <Homework state={state} actions={actions} type="Make" />} />
                                                            <Route path="/admin/revise/:homeworkNum" render={() => <Homework state={state} actions={actions} type="Fix" />} />
                                                            <Route exact path="/Admin" render={() => <AdminMain state={state} actions={actions} />} />
                                                            <Route path="/Admin/ChattingList" render={()=> <ChattingList state={state} actions={actions}/>}/>
                                                            <Route path="/Admin/Chatting/:userId" render={()=> <AdminChatting state={state} actions={actions}/>}/>
                                                        </>
                                                    );
                                                }
                                            }
                                        </AccessTokenConsumer>
                                    </AccessTokenProvider>
                                    <AuthProvider>
                                        <AuthConsumer>
                                            {
                                                ({ state, actions }) =>
                                                    <Route
                                                        exact
                                                        path="/"
                                                        render={() =>
                                                            <Main
                                                                state={state}
                                                                actions={actions}
                                                                taskActions={taskActions}
                                                                taskState={taskState}
                                                                setHomeworkDataInState={setHomeworkDataInState}
                                                                setIsLogin={setIsLogin}
                                                            />}
                                                    />
                                            }
                                        </AuthConsumer>
                                    </AuthProvider>
                                </>
                            );
                        }
                    }
                </TaskConsumer>
            </TaskProvider>
        </Switch>
    )
};

export default withRouter(App);