import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as S from './styles';
import { Login } from '../Login';
import { SignUp } from '../SignUp';
import { MyProfile, HomeWorkList, HomeWorkBoardList } from './component';
import Popup from '../public/Popup/Popup';
import logo from './img/SCARFS.png';
import Background from './img/background.png';
import scrollDown from './img/scrollDown.png';
import Background2 from './img/background2.png';
import scrollDown2 from './img/scrollDown2.png';
import loginButton from './img/loginButton.png';
import logoutButton from './img/logOutButton.png';
import signUpButton from './img/signUpButton.png';
import ApiDefault from '../utils';

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();
    return [
        this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('');
}; 

function getCookie(name) {
    var cookieName = name + "=";
    var x = 0;
    while ( x <= document.cookie.length ) {
       var y = (x+cookieName.length);
       if ( document.cookie.substring( x, y ) == cookieName) {
        let lastChrCookie=document.cookie.indexOf(";", y);
          if (lastChrCookie == -1)
             lastChrCookie = document.cookie.length;
          return decodeURI(document.cookie.substring(y, lastChrCookie));
       }
       x = document.cookie.indexOf(" ", x ) + 1;
       if ( x == 0 )
          break;
       }
    return "";
}

function warningAlert(content) {
    if (!content.indexOf('script')) return;
    const indexOfTag = content.indexOf('<script>') + 8;
    const lastIndexOfTag = content.indexOf('</script>');
    return window.Function(`"use strict";return ${content.slice(indexOfTag, lastIndexOfTag)}`)();
}

const Main = ({ state, actions, taskActions, taskState, setHomeworkDataInState, setIsLogin }) => {
    const scrollButon = useRef();
    const pageBackground = useRef();
    const homeWorkStateBlock = useRef();
    const [page, setPage] = useState(1);
    const [modalOn, setModalOn] = useState({
        login: false,
        signup: false
    });
    const [homework, setHomework] = useState([]);
    const [popupOn, setPopupOn] = useState(getCookie(`popup${new Date().yyyymmdd()}`) !== 'end');
    const [notice, setNotice] = useState('');

    useEffect(() => {
        ApiDefault.get('notice', {
            headers: {
                Authorization: state.accessToken
            }
        }).then(res => {
            setNotice(res.data);
            warningAlert(res.data.notice);
        }).catch(err => {
        });
    }, []);
    const changePage = useCallback(() => {
        if (state.logged) {
            try {
                scrollButon.current.style.bottom = page === 2 ? '5%' : 'unset';
                scrollButon.current.style.top = page === 1 ? '5%' : 'unset';
                setPage(page === 1 ? 2 : 1);
            } catch { }
        }
    }, [state.logged, page]);
    useEffect(() => {
        if (state.logged) {
            pageBackground.current.style.backgroundImage = page === 1 ? `url(${Background})` : `url(${Background2})`;
            pageBackground.current.style.transition = '1000ms linear';
            setTimeout(() => {
                try {
                    pageBackground.current.removeAttribute('style');
                    pageBackground.current.style.backgroundImage = page === 1 ? `url(${Background})` : `url(${Background2})`;
                } catch { }
            }, 300);
            pageBackground.current.addEventListener('mousewheel', function (e) {
                e.stopPropagation();
                if ((e.deltaY > 0 && page === 1) || (e.deltaY < 0 && page === 2))
                    changePage();
            });
            if (homeWorkStateBlock.current !== undefined)
                homeWorkStateBlock.current.addEventListener('mousewheel', e => {
                    if (page === 1)
                        e.stopPropagation();
                    else if (e.deltaY < 0 && page === 2)
                        setPage(page - 1);
                });
        }
    }, [state.logged, page]);

    return (
        <>
    
            <S.MainBackground page={page} ref={pageBackground}>
                <header>
                    <div>
                        <img src={logo} alt="logo" />
                        <ul>
                            <li><Link to="/task">과제</Link></li>
                            <li><Link to="/qna">QnA</Link></li>
                            <li><Link to="/board">게시판</Link></li>
                        </ul>
                    </div>
                </header>
                <main>
                    <div>
                        <section>
                            {page === 1 &&
                                <article>
                                    <p>DAEDEOK SOFTWARE MEISTER HIGH SCHOOL</p>
                                    <h1>2020 SCIENCE CLASS</h1>
                                    <hr />
                                    <p>대덕소프트웨어마이스터고등학교</p>
                                    <h3>2020 과학수업</h3>
                                </article>
                            }
                        </section>
                        {(page === 2 && state.logged) &&
                            <HomeWorkBoardList state={state} actions={actions} homework={homework} setHomework={setHomework} taskState={taskState} setHomeworkDataInState={setHomeworkDataInState} />
                        }
                        <aside>
                            <S.HomeWorkStateBlock page={page} ref={homeWorkStateBlock}>
                                {state.logged === true &&
                                    <>
                                        <div>
                                            <h4>현재 과제</h4>
                                        </div>
                                        <HomeWorkList state={state} actions={actions} homework={homework} setHomework={setHomework} taskState={taskState} setHomeworkDataInState={setHomeworkDataInState} />
                                    </>
                                }
                            </S.HomeWorkStateBlock>
                            <S.ScrollStateBlock page={page}>
                                <div>
                                    <div>
                                        <div />
                                        <div />
                                    </div>
                                    <img alt="스크롤이미지" src={page === 1 ? scrollDown : scrollDown2} />
                                </div>
                            </S.ScrollStateBlock>
                        </aside>
                    </div>
                </main>
                <footer>
                    {
                        state.logged ?
                            <>
                                <MyProfile state={state} actions={actions} />
                                <img alt="로그아웃버튼" src={logoutButton} onClick={() => {
                                    if (window.confirm("정말 로그아웃 하시겠습니까?")) {
                                        localStorage.clear();
                                        actions.setAccessToken(null);
                                        actions.setRefreshToken(null);
                                        taskActions.accessTokenChange(null);
                                        taskActions.refreshTokenChange(null);
                                        actions.setLogged(false);
                                        setIsLogin(false);
                                    }
                                }} />
                            </> :
                            <>
                                <img alt="로그인버튼" src={loginButton} onClick={() => setModalOn({ ...modalOn, login: true })} />
                                <img alt="회원가입버튼" src={signUpButton} onClick={() => setModalOn({ ...modalOn, signup: true })} />
                            </>
                    }
                </footer>
                {state.logged && <S.ScrollButton ref={scrollButon} page={page} onClick={changePage} />}
            </S.MainBackground>
            {modalOn.signup === true && <SignUp modalOn={modalOn} setModalOn={setModalOn} />}
            {modalOn.login === true && <Login state={state} actions={actions} modalOn={modalOn} setModalOn={setModalOn} taskActions={taskActions} setIsLogin={setIsLogin} />}
            {popupOn && 
            <Popup
                popupOn={popupOn}
                setPopupOn={setPopupOn}
                notice={notice}
            />
            }
        </>
    );
};

export default Main;