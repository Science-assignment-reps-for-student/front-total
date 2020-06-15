import React, { useState, useCallback, useEffect } from 'react'
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import { PeerEvaluation, Task, TaskGuide, AdminLogin, Homework, AdminMain, Main, QnA, AdminChatting, ChattingList, Board, BoardDetail, BoardInput, BoardFix, Fixing } from './components';
import { AuthConsumer, AuthProvider } from './context/Auth';
import { TaskProvider, TaskConsumer } from './context/AppContext';
import { AccessTokenProvider, AccessTokenConsumer } from './context/AccessTokenContext';
import Global from './styled';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { socketURL } from './components/resource/serverURL';
import NoMatch from './components/NoMatch/NoMatch';

const App = () => {
    const history = useHistory();
    const [members, setMembers] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const [homeworkData, setHomeworkData] = useState({});
    const [socket, socketChange] = useState();
    const [stomp, stompChange] = useState();
    const [maintenance, setMaintenance] = useState(false);

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
                else if (code === 404)
                    history.push("/404");
            })
        }
    }, []);
    const getUserInfo = useCallback((limServer, accessToken) => {
        if (typeof accessToken === "object") return;
        return axios.get(`${limServer}/user`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken,
                "Cache-Control": "no-store",
            }
        })
    }, []);

    const checkUserIsLogin = useCallback(() => {
        const ApiDefault = {
            url: "https://api.dsm-scarfs.hs.kr/chuckflap",
            headers: {
                "Authorization": localStorage.getItem("accessToken")
            }
        }
        ApiDefault.instance = axios.create({
            baseURL: ApiDefault.url,
            headers: ApiDefault.headers
        });
        (async () => {
            try {
                const user = await ApiDefault.instance.get("/user");
                setIsLogin(true);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const setSocket = () => {
        const socket = new SockJS(socketURL);
        const stomp = Stomp.over(socket);
        stompChange(stomp);
        socketChange(socket);
        stomp.connect(
            {},
            {},
            () => {
            },
            () => {
                console.log("error");
            },//error
            () => {//close
                setTimeout(setSocket(), 5000);
            }
        );
    }

    const isMaintenance = () => {
        axios.get("http://54.180.174.253:5410/sirloin/maintenance")
        .catch(err => {
            if (typeof err.response === "undefined") return;
            if (err.response.status === 503) {
                setMaintenance(true);
            }
        })
    }

    useEffect(() => {
        isMaintenance();
        checkUserIsLogin();
        setSocket();
    }, []);

    return (
        <TaskProvider>
            <TaskConsumer>
                {
                    ({ taskActions, taskState }) => {
                        return (
                            <AccessTokenProvider>
                                <AccessTokenConsumer>
                                    {
                                        ({ actions, state }) => {
                                            return (
                                                <AuthProvider>
                                                    <AuthConsumer>
                                                        {
                                                            ({ authState, authActions }) =>
                                                                <>
                                                                    <Global />
                                                                    {
                                                                        // <Fixing />
                                                                        // maintenance ? <Fixing /> :
                                                                            <Switch>
                                                                                <Route
                                                                                    path="/fixing"
                                                                                    render={() =>
                                                                                        <Fixing />
                                                                                    }
                                                                                />
                                                                                <Route
                                                                                    path="/qna"
                                                                                    render={() =>
                                                                                        <QnA
                                                                                            stomp={stomp}
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
                                                                                            isLogin={isLogin}
                                                                                            setIsLogin={setIsLogin}
                                                                                            getUserInfo={getUserInfo}
                                                                                            setHomework={setHomework}
                                                                                            taskActions={taskActions}
                                                                                            setHomeworkDataInState={setHomeworkDataInState}
                                                                                        />
                                                                                    }
                                                                                />
                                                                                <Route
                                                                                    path="/board/:number"
                                                                                    render={() => <BoardDetail
                                                                                        state={taskState}
                                                                                        getUserInfo={getUserInfo}
                                                                                        isLogin={isLogin}
                                                                                        taskActions={taskActions}
                                                                                    />}
                                                                                />
                                                                                <Route
                                                                                    exact
                                                                                    path="/board"
                                                                                    render={() => <Board
                                                                                        state={taskState}
                                                                                        getUserInfo={getUserInfo}
                                                                                        isLogin={isLogin}
                                                                                        taskActions={taskActions}
                                                                                    />}
                                                                                />
                                                                                <Route path="/write/:number" render={() =>
                                                                                    <BoardFix
                                                                                        state={taskState}
                                                                                        getUserInfo={getUserInfo}
                                                                                        isLogin={isLogin}
                                                                                        taskActions={taskActions}
                                                                                    />}
                                                                                />
                                                                                <Route path="/write" render={() =>
                                                                                    <BoardInput
                                                                                        state={taskState}
                                                                                        getUserInfo={getUserInfo}
                                                                                        isLogin={isLogin}
                                                                                        taskActions={taskActions}
                                                                                    />}
                                                                                />
                                                                                <Route path="/admin/login" render={() => <AdminLogin actions={actions} />} />
                                                                                <Route path="/admin/make" render={() => <Homework state={state} actions={actions} type="Make" stomp={stomp} />} />
                                                                                <Route path="/admin/revise/:homeworkNum" render={() => <Homework state={state} actions={actions} type="Fix" stomp={stomp} />} />
                                                                                <Route path="/Admin/ChattingList" render={() => <ChattingList state={state} actions={actions} stomp={stomp} />} />
                                                                                <Route path="/Admin/Chatting/:userId" render={() => <AdminChatting state={state} actions={actions} stomp={stomp} />} />
                                                                                <Route exact path="/Admin" render={() => <AdminMain state={state} actions={actions} stomp={stomp} />} />
                                                                                <Route
                                                                                    exact
                                                                                    path="/"
                                                                                    render={() =>
                                                                                        <Main
                                                                                            state={authState}
                                                                                            actions={authActions}
                                                                                            taskActions={taskActions}
                                                                                            taskState={taskState}
                                                                                            setHomeworkDataInState={setHomeworkDataInState}
                                                                                            setIsLogin={setIsLogin}
                                                                                        />}
                                                                                />
                                                                                <Route component={NoMatch} />
                                                                            </Switch>
                                                                    }
                                                                </>
                                                        }
                                                    </AuthConsumer>
                                                </AuthProvider>
                                            );
                                        }
                                    }
                                </AccessTokenConsumer>
                            </AccessTokenProvider>
                        );
                    }
                }
            </TaskConsumer>
        </TaskProvider>
    )
};

export default withRouter(App);