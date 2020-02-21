import React, { useState, useEffect, useRef, useCallback } from 'react';
import SockJS from 'react-stomp'
import * as Styled from './Styled';
import send from './img/send.png';
/* 
<html>
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.0.0/sockjs.min.js"></script>
    <script>
        let roomId = getUrlPar('roomId');
        let socket = new SockJS('http://localhost:8888/socket');
        let socketStomp = Stomp.over(socket);
        socketStomp.connect({}, function() {
            socketStomp.subscribe('/receive/'+roomId, function(msg) {
                if(list.innerHTML == '') list.innerHTML = msg.body;
                else list.innerHTML = list.innerHTML + '\n' + msg.body;
                list.scrollTop = list.scrollHeight;
            });
        });
        function messageSend(message) {
            socketStomp.send('/chat/'+roomId, {}, message);
        }
        function enterKeyboard(event) {
            if (event.code == 'Enter' || event.code === 'NumpadEnter') {
                messageSend(message.value);
                message.value = '';
            }
        }
        function getUrlPar(name) {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
                results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        }
    </script>
</head>
<body>
    <textarea id="list" style="width: 50%;height: 50%;"></textarea>
    <input onkeypress="enterKeyboard(event)" id="message" type="text" autofocus />
</body>
</html>
*/

const data = [
    { text: "asdasdasdasdasd", who: "teacher" },
    { text: "qweqweqweqweqwe", who: "student" },
    { text: "asdasdasdasdasd", who: "teacher" },
    { text: "qweqweqweqweqwe", who: "student" },
    { text: "asdasdasdasdasd", who: "teacher" },
    { text: "qweqweqweqweqwe", who: "student" },
    { text: "asdasdasdasdasd", who: "teacher" },
    { text: "qweqweqweqweqwe", who: "student" },
    { text: "asdasdasdasdasd", who: "teacher" },
    { text: "qweqweqweqweqwe", who: "student" },
    { text: "asdasdasdasdasd", who: "teacher" },
    { text: "qweqweqweqweqwe", who: "student" },
    { text: "asdasdasdasdasd", who: "teacher" },
    { text: "qweqweqweqweqwe", who: "student" },
];

const QnA = () => {
    
    const chatMain = useRef(null);
    const chatInput = useRef(null);
    const [chat, setChat] = useState("");
    const [chatList, setChatList] = useState(data);

    const onChangeChat = useCallback((e) => setChat(e.target.value), []);
    const checkInputIsEmpty = useCallback(() => {
        const input = chatInput.current;
        if (input.value === "") return true;
        else {
            input.focus();
            return false;
        }
    }, [chatList, chatInput]);
    const onSetChatList = useCallback((text, who) => {
        if (checkInputIsEmpty()) return;
        setChatList([...chatList, { text: text, who: who }]);
        chatInput.current.value = "";
        chatInput.current.focus();

    }, [chatList, chatInput]);

    return (
        <Styled.QnA>
            <div>
                <header><h1>박지연 선생님</h1></header>
                <section ref={chatMain}>
                    <ul>
                        {chatList.map((chat, i) => {
                            return (
                                chat.who === "teacher"
                                    ? <li className="chat-teacher" key={i}>
                                        <p>박지연 선생님</p>
                                        <div><span>{chat.text}</span></div>
                                    </li>
                                    : <li className="chat-student" key={i}>
                                        <div><span>{chat.text}</span></div>
                                    </li>
                            )
                        })
                        }
                    </ul>
                    <div className="input-wrap">
                        <div>
                            <div>
                                <input
                                    type="text"
                                    onChange={onChangeChat}
                                    onKeyUp={(e) => {
                                        if (e.keyCode === 13) {
                                            onSetChatList(chat, "student");
                                            setChat("");
                                        }
                                    }}
                                    value={chat}
                                    ref={chatInput}
                                    placeholder="과학선생님께 문의할 메세지를 입력하세요." />
                            </div>
                            <div>
                                <img
                                    src={send}
                                    onClick={() => {
                                        onSetChatList(chat, "teacher");
                                        setChat("");
                                    }}
                                    alt="send-message" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Styled.QnA>
    )
};

export default QnA;