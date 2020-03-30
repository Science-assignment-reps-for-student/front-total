import React, { useState, useCallback, useEffect } from 'react'
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import { PeerEvaluation, Task, TaskGuide, AdminLogin, Homework, AdminMain, Main, QnA, AdminChatting, ChattingList, Board, BoardDetail, BoardInput } from './components';
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
        if (localStorage.getItem("accessToken")) {
            setIsLogin(true);
            setSocket();
        }
    }, []);

    const setSocket = () => {
        const socket = new SockJS(socketURL);
        const stomp = Stomp.over(socket);
        stompChange(stomp);
        socketChange(socket);
        stomp.connect(
            {},
            {},
            ()=> { 
            },
            ()=> {
                console.log("error");
            },//error
            ()=> {//close
                setTimeout(setSocket(),5000);
            }
        );
    }

    const getNotificationPermission = () => {
        if (!("Notification" in window)) {
            alert("데스크톱 알림을 지원하지 않는 브라우저입니다.");
        }
        Notification.requestPermission(function (result) {
            if(result === 'denied') {
                alert('알림을 차단하셨습니다.\n브라우저의 사이트 설정에서 변경하실 수 있습니다.');
                return false;
            }
        });
    }

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
                                                                            <Switch>
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
                                                                                        getUserInfo={getUserInfo}
                                                                                        setHomework={setHomework}
                                                                                        taskActions={taskActions}
                                                                                        setHomeworkDataInState={setHomeworkDataInState}
                                                                                        />
                                                                                    }
                                                                                    />
                                                                                <Route 
                                                                                path="/board/:number" 
                                                                                render={()=> <BoardDetail
                                                                                    state={taskState}
                                                                                    getUserInfo={getUserInfo}
                                                                                    isLogin={isLogin}
                                                                                    />}
                                                                                    />
                                                                                <Route 
                                                                                exact
                                                                                path="/board" 
                                                                                render={()=> <Board
                                                                                    state={taskState}
                                                                                    getUserInfo={getUserInfo}
                                                                                    isLogin={isLogin}
                                                                                    />}
                                                                                    />
                                                                                <Route path="/write" render={()=> 
                                                                                    <BoardInput 
                                                                                    state={taskState}
                                                                                    getUserInfo={getUserInfo}
                                                                                    isLogin={isLogin}
                                                                                    />}
                                                                                    />
                                                                                <Route path="/admin/login" render={() => <AdminLogin actions={actions}/>} />
                                                                                <Route path="/admin/make" render={() => <Homework state={state} actions={actions} type="Make" stomp={stomp}/>} />
                                                                                <Route path="/admin/revise/:homeworkNum" render={() => <Homework state={state} actions={actions} type="Fix" stomp={stomp}/>}/>
                                                                                <Route path="/Admin/ChattingList" render={()=> <ChattingList state={state} actions={actions} stomp={stomp}/>} />
                                                                                <Route path="/Admin/Chatting/:userId" render={()=> <AdminChatting state={state} actions={actions} stomp={stomp}/>}/>
                                                                                <Route exact path="/Admin" render={() => <AdminMain state={state} actions={actions} stomp={stomp}/>} />
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