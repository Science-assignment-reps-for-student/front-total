import React, { useState, useRef, useCallback, useEffect } from 'react';
import * as Styled from './Styled';
import { getAccessTokenUsingRefresh } from '../resource/publicFunction';
import send from './img/send.png';
import axios from 'axios';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Header } from '../Header';
import { useHistory } from 'react-router-dom';

const QnA = ({ state, actions, isLogin, getUserInfo }) => {
    const history = useHistory();
    const { limServer, accessToken } = state;
    const chatInput = useRef(null);
    const chatMain = useRef(null);
    const [chat, setChat] = useState("");
    const [isOut, setIsOut] = useState(false);
    const [ableSocket, setAbleSocket] = useState(false);
    const [stompState, setStompState] = useState(undefined);
    const [socketState, setSocketState] = useState(undefined);
    const [chatList, setChatList] = useState([]);
    const [my, setMy] = useState({});
    const [buffer, setBuffer] = useState({
        chat: {},
        scroll: 0
    });

    const scrollBufChange = useCallback(() => {
        if (chatMain.current !== null) {
            setBuffer({ ...buffer, scroll: chatMain.current.scrollHeight });
        }
    }, [chatMain]);
    const pad = useCallback((n, width = 2) => {
        n = n + "";
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }, []);
    const getFullDate = useCallback((date = new Date()) => {
        const a = new Date(date), y = a.getFullYear(), m = a.getMonth() + 1, d = a.getDate(), h = a.getHours(), min = a.getMinutes(), sec = a.getSeconds();
        return `${y}-${pad(m)}-${d} ${h}:${min}:${sec}`;
    }, []);
    const onChangeChat = useCallback((e) => setChat(e.target.value), []);
    const setMainScroll = useCallback(() => {
        if (chatMain.current === null) return;
        else chatMain.current.scrollTop = buffer.scroll;
    }, [chatMain, buffer.scroll]);
    const checkInputIsEmpty = useCallback(() => {
        const input = chatInput.current;
        if (input.value === "") return true;
        input.focus();
        return false;
    }, [chatList, chatInput]);
    const makeChatJsx = useCallback(() => {
        const list = chatList.map((chat, i) => {
            return (
                chat.messageType === 1
                    ? <li className="chat-teacher" key={i}>
                        <p>선생님 <span>{getFullDate(chat.messageTime)}</span></p>
                        <div><span>{chat.message}</span></div>
                    </li>
                    : <li className="chat-student" key={i}>
                        <p><span>{getFullDate(chat.messageTime)}</span></p>
                        <div><span>{chat.message}</span></div>
                    </li>
            )
        });
        return list;
    }, [chatList]);
    // About Socket
    const getAllChatRequest = useCallback(() => {
        if (my.userId === undefined) return;
        else {
            axios.get(`${limServer}/message/${my.userId}`, {
                headers: {
                    Authorization: accessToken
                }
            }).then(e => {
                setChatList(e.data);
                scrollBufChange();
                chatMain.current.scrollTop = chatMain.current.scrollHeight;
            }).catch(err => {
                const code = err.response.status;
                if (code === 403)
                    getAccessTokenUsingRefresh(state, actions);
            })
        }
    }, [state, my]);
    const sendMessage = useCallback((msg) => {
        if (checkInputIsEmpty() || my.userId === undefined) return;
        const stringedData = JSON.stringify({
            "token": accessToken,
            "message": msg
        });
        stompState.send(`/send/${my.userId}`, {}, stringedData);
        chatInput.current.focus();
    }, [state, stompState, my]);
    const setSocket = useCallback(() => {
        const socket = new SockJS("http://54.180.174.253:8888/chuckflap/socket");
        const stomp = Stomp.over(socket);
        setStompState(stomp);
        setSocketState(socket);
        stomp.connect(
            {}, {}, 
            () => { },  // success 
            () => { },  // error
            () => {     // close
                if (!isOut) {
                    setTimeout(setSocket, 5000);
                }
            }
        );
    }, []);

    useEffect(() => {
        if (accessToken === null) {
            alert("로그인 후 이용해주세요.");
            history.push("/");
        }
        return () => {
            setIsOut(true);
        }
    }, []);
    useEffect(() => {
        if (isLogin) {
            axios.get(`${limServer}/message`, {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }).then(e => {
                // console.log(e);
                getUserInfo(limServer, localStorage.getItem("accessToken"))
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
        getAllChatRequest();
    }, [my]);
    useEffect(() => {
        if (buffer.chat.hasOwnProperty("message")) {
            setChatList([...chatList, buffer.chat]);
        }
    }, [buffer.chat]);
    useEffect(() => {
        setMainScroll();
    }, [chatList]);
    useEffect(() => {
        if (stompState && my.userId) {
            stompState.onConnect = () => {
                setAbleSocket(true);
                stompState.subscribe(`/receive/${my.userId}`, (msg) => {
                    setBuffer({ ...buffer, chat: JSON.parse(msg.body) });
                    scrollBufChange();
                });
            }
        }
    }, [stompState, my]);
    useEffect(() => {
        if (socketState) {
            return () => {
                socketState.close();
            }
        }
    }, [socketState]);
    useEffect(() => {
        if (stompState) {
            return () => {
                stompState.disconnect()
            }
        }
    }, [stompState])

    return (
        <>
            <Header />
            <Styled.QnA>
                <div>
                    <div className={ableSocket ? "connected" : "disConnected"}>채팅 서버와 연결되지 않았습니다</div>
                    <header>
                        <h1>과학 선생님</h1>
                    </header>
                    <section>
                        <ul ref={chatMain}>
                            {makeChatJsx()}
                        </ul>
                        <div className="input-wrap">
                            <div>
                                <div>
                                    <input
                                        type="text"
                                        onChange={onChangeChat}
                                        onKeyUp={(e) => {
                                            if (e.keyCode === 13 && ableSocket) {
                                                sendMessage(chat);
                                                setChat("");
                                            }
                                        }}
                                        autoFocus={true}
                                        value={chat}
                                        ref={chatInput}
                                        placeholder="과학선생님께 문의할 메세지를 입력하세요." />
                                </div>
                                <div>
                                    <img
                                        src={send}
                                        onClick={() => {
                                            if (ableSocket) {
                                                sendMessage(chat);
                                                setChat("");
                                            }
                                        }}
                                        alt="send-message" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Styled.QnA>
        </>
    )
};

export default QnA;