import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import { PeerEvaluation, Task, TaskGuide, AdminLogin, Homework, AdminMain, Main, QnA } from './components';
import { AuthConsumer, AuthProvider } from './context/Auth';
import { TaskProvider, TaskConsumer } from './context/AppContext';
import { AccessTokenProvider, AccessTokenConsumer } from './context/AccessTokenContext';
import Global from './styled';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';

const App = () => {
    const history = useHistory();
    const chatMain = useRef(null);
    const [my, setMy] = useState({});
    const [members, setMembers] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const [homeworkData, setHomeworkData] = useState({});
    const [stompState, setStompState] = useState(undefined);
    const [usableSocket, SetUsableSocket] = useState(false);
    const [buffer, setBuffer] = useState({
        chat: {},
        scroll: 0
    });

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
    const scrollBufChange = useCallback(() => {
        if (chatMain.current !== null) {
            setBuffer({ ...buffer, scroll: chatMain.current.scrollHeight });
        }
    }, [chatMain]);
    const setSocket = useCallback(() => {
        const socket = new SockJS("http://54.180.174.253:8888/chuckflap/socket");
        const stomp = Stomp.over(socket);
        setStompState(stomp);
        stomp.connect(
            {}, {}, () => { },  // success 
            () => { },  // error
            () => {     // close
                setSocket();
            }
        );
    }, []);

    useEffect(() => {
        if (isLogin || localStorage.getItem("accessToken") !== null) {
            axios.get("http://54.180.174.253:8888/chuckflap/message", {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }).then(e => {
                console.log(e);
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
        }
    }, [stompState, my]);

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
                                                my={my}
                                                buffer={buffer}
                                                state={taskState}
                                                chatMain={chatMain}
                                                actions={taskActions}
                                                stompState={stompState}
                                                usableSocket={usableSocket}
                                                scrollBufChange={scrollBufChange}
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
                                                        </>
                                                    );
                                                }
                                            }
                                        </AccessTokenConsumer>
                                    </AccessTokenProvider>
                                    <AuthProvider>
                                        <AuthConsumer>
                                            {
                                                ({ state, actions }) => <Route exact path="/" render={() => <Main state={state} actions={actions} taskActions={taskActions} taskState={taskState} setHomeworkDataInState={setHomeworkDataInState} setIsLogin={setIsLogin} />} />
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