import React, { useCallback, useEffect, useState } from 'react';
import { withRouter, Link, useParams, useHistory } from 'react-router-dom';
import { getAccessTokenUsingRefresh } from '../../../resource/publicFunction';
import * as Styled from '../Styled';
import ExperimentImage from '../../img/ExperimentImage.png';
import featherPaperclip from '../../img/featherPaperclip.png';
import axios from 'axios';

const TaskTop = ({ state, taskActions, members, getUserInfo, homeworkData }) => {
    const history = useHistory();
    const { wooServer, limServer, accessToken } = state;
    const { homeworkId } = useParams();
    const {
        created_at,
        homework_type,
        homework_title,
        homework_1_deadline,
        homework_2_deadline,
        homework_3_deadline,
        homework_4_deadline,
        homework_description,
        file_info,
    } = homeworkData;
    const [userInfo, setUserInfo] = useState({});

    const pad = useCallback((n, width = 2) => {
        n = n + "";
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }, []);
    const getFullTime = useCallback((time) => {
        if (time === undefined) return;
        const newTime = new Date(time);
        const year = newTime.getFullYear(),
            month = pad(newTime.getMonth() + 1),
            date = pad(newTime.getDate()),
            hours = newTime.getHours(),
            minutes = pad(newTime.getMinutes());
        return `${year}.${month}.${date} ${hours}:${minutes}`;
    }, []);
    const getHomeworkFiles = useCallback(() => {
        if (typeof accessToken === "object") return;
        if (typeof file_info === "object" && file_info.length !== 0) {
            file_info.map((info) => {
                const { file_name, file_id } = info;
                history.push(`/notice/${file_id}`);
                axios.get(`${wooServer}/notice/${file_id}`, {
                    headers: {
                        Accept: "application/octet-stream",
                        Authorization: `Bearer ${accessToken}`
                    }, responseType: "blob",
                }).then((response) => {
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(response.data);
                    link.download = file_name;
                    link.click();
                    history.go(-1);
                }).catch((error) => {
                    if (typeof error.response === "undefined") return;
                    const code = error.response.status;
                    if (code === 401)
                        history.push("/");
                    else if (code === 410)
                        getAccessTokenUsingRefresh(state, taskActions);
                })
            });
        } else {
            alert("첨부파일이 없습니다.");
        }
    }, [history, state, homeworkData]);

    useEffect(() => {
        getUserInfo(limServer, accessToken)
            .then((response) => {
                setUserInfo(response.data);
            })
    }, []);

    return (
        <Styled.TaskTop className="task-top">
            <div className="task-header">
                <div>
                    <h1>[{homework_type === 0 ? "개인" : (homework_type === 1 ? "팀" : "실험")}] {homework_title}</h1>
                </div>
                <nav>
                    <ul>
                        {(homework_type !== 0 && members.teamName !== undefined) && <li>팀 이름: {members.teamName}</li>}
                        <li>dino7795</li>
                        <li><span>작성일</span> {getFullTime(created_at)}</li>
                    </ul>
                </nav>
            </div>
            <div className="task-desc">
                <div className="desc">
                    <h3>
                        제출마감:
                        {
                            typeof userInfo.userNumber === "number" &&
                            (userInfo.userNumber.toString().split("")[1] === "1" ? getFullTime(homework_1_deadline) :
                                userInfo.userNumber.toString().split("")[1] === "2" ? getFullTime(homework_2_deadline) :
                                    userInfo.userNumber.toString().split("")[1] === "3" ? getFullTime(homework_3_deadline) :
                                        userInfo.userNumber.toString().split("")[1] === "4" ? getFullTime(homework_4_deadline) :
                                            null)
                        }까지
                    </h3>
                    <pre>{homework_description}</pre>
                </div>
                <div className="file">
                    <div className="file-input">
                        <a onClick={getHomeworkFiles}>
                            <img src={featherPaperclip} alt="featherPaperclip" />
                            <span>첨부파일</span>
                        </a>
                    </div>
                    <div className="file-img">
                        <img src={ExperimentImage} alt="experimentImage" />
                    </div>
                </div>
            </div>
        </Styled.TaskTop>
    );
};

export default withRouter(TaskTop);