import React, { useRef, useState, useCallback, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { getAccessTokenUsingRefresh } from '../../../resource/publicFunction';
import * as Styled from '../Styled';
import featherPaperclip from '../../img/featherPaperclip.png';
import plus from '../../img/plus.png';
import axios from 'axios';

const TaskBottom = ({ state, taskActions, homeworkData, members, setMembers, homeworkId, teamRequestGet, onClickToggleModal }) => {
    const history = useHistory();
    const { wooServer, limServer, accessToken } = state;
    const { homework_type } = homeworkData;
    const fileInput = useRef(null);
    const teamTitleInput = useRef(null);
    const [files, setFiles] = useState([]);

    const addFileList = useCallback(() => {
        const fileName = fileInput.current.files[0].name;
        const lastIdxOfDot = fileName.lastIndexOf(".");
        if (fileName.slice(lastIdxOfDot, fileName.length) !== ".hwp") throw "Invalid file extenstion";
        files.map((file) => { if (file.name === fileName) throw "Duplicate filename."; })
        setFiles([...files, fileInput.current.files[0]]);
    }, [files, fileInput]);
    const removeFilesList = useCallback((e) => {
        const fileName = e.target.parentNode.childNodes[0].childNodes[2].innerHTML;
        const removeIdx = files.findIndex((file) => file.name === fileName);
        const copy = [...files];
        copy.splice(removeIdx, 1);
        setFiles(copy);
    }, [files, fileInput]);
    const onClickSubmitFiles = useCallback(() => {
        if (files.length === 0) return alert("파일을 1개 이상 추가해주세요.");
        let fd = new FormData();
        files.map((file) => {
            fd.append("file[]", file);
        });
        axios.post(`${wooServer}/${homework_type === 1 ? "multi" : "single"}/${homeworkId}`, fd, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
            }
        }).catch((error) => {
            if (typeof error.response === "undefined") return;
            const code = error.response.status;
            if (code === 401)
                history.push("/");
            else if (code === 403)
                alert("팀장만이 숙제를 제출할 수 있습니다.");
            else if (code === 409)
                alert("숙제를 이미 제출하였습니다.");
            else if (code === 410)
                getAccessTokenUsingRefresh(state, taskActions);
            else if (code === 415)
                alert("파일 확장자는 \".hwp\"만 가능합니다. ")
        })
        setFiles([]);
    }, [fileInput, files, state]);
    const createTeamRequest = useCallback(() => {
        if (teamTitleInput.current.value.trim() === "")
            return alert("팀 명을 입력해주세요.");
        axios({
            method: "POST",
            url: `${limServer}/team`,
            data: {
                teamName: teamTitleInput.current.value,
                homeworkId: homeworkId,
            },
            headers: {
                Authorization: accessToken
            }
        }).then(() => {
            teamRequestGet();
        }).catch((error) => {
            if (typeof error.response === "undefined") return;
            const code = error.response.status;
            if (code === 403)
                history.push("/");
            else if (code === 410)
                getAccessTokenUsingRefresh(state, taskActions);
        })
    }, [homeworkId, state, teamTitleInput]);
    const deleteTeamRequest = useCallback(() => {
        if (!window.confirm("정말로 팀을 삭제하시겠습니까?")) return;
        axios({
            method: "DELETE",
            url: `${limServer}/team/${members.teamId}`,
            headers: {
                Authorization: accessToken
            }
        }).then(() => {
            setMembers({});
        }).catch((error) => {
            if (typeof error.response === "undefined") return;
            const code = error.response.status;
            if (code === 400) 
                alert("팀장만이 팀 삭제를 할 수 있습니다.");
            else if (code === 403)
                history.push("/");
            else if (code === 410)
                getAccessTokenUsingRefresh(state, taskActions);
        })
    }, [state, members]);

    useEffect(() => {
        if (homeworkData.homework_type === 1 || homeworkData.homework_type === 2) {
            teamRequestGet();
        }
    }, [homeworkData, homeworkId]);

    return (
        <Styled.TaskBottom className="task-bottom">
            {homework_type !== 0 &&
                <div className="task-bottom-left">
                    <div className="show--title">
                        <h4>팀원</h4>
                        {Object.keys(members).length === 0 ?
                            <>
                                <input type="text" ref={teamTitleInput} placeholder="팀 명을 입력해주세요." />
                                <button onClick={createTeamRequest}>
                                    <img src={plus} alt="plus-member" />
                                    <span>팀 생성</span>
                                </button>
                            </> :
                            <>
                                <button onClick={deleteTeamRequest}>팀 삭제</button>
                                <button onClick={onClickToggleModal}>
                                    <img src={plus} alt="plus-member" />
                                    <span>팀원 추가</span>
                                </button>
                            </>
                        }
                    </div>
                    <div className="show--list">
                        <div className="file-wrap">
                            {Object.keys(members).length === 0 ?
                                <div>
                                    <div>
                                        <h6>아직 포함된 팀이 없습니다.</h6>
                                        <p>팀장에게 <span>팀원추가</span> 요청 또는 <span>팀 생성</span> 을 해주세요.</p>
                                    </div>
                                </div> :
                                <ul>
                                    <li>
                                        <div>
                                            <p>팀장</p>
                                            <h5>{`${members.leaderNumber} ${members.leaderName}`}</h5>
                                        </div>
                                    </li>
                                    {members.members.length !== 0 &&
                                        members.members.map((member, i) => {
                                            return (
                                                <li key={i} data-uuid={member.uuid}>
                                                    <div>
                                                        <p>팀원</p>
                                                        <h5>{member.userNumber} {member.userName}</h5>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            }
                        </div>
                    </div>
                </div>}
            <div className="task-bottom-right">
                <div className="submit--title"><h4>제출하기</h4></div>
                <div className="submit--list">
                    <div className="file-wrap">
                        <ul>
                            {files.length !== 0 && files.map((file, i) => {
                                return (
                                    <li key={i}>
                                        <div>
                                            <i></i>
                                            <img src={featherPaperclip} alt="featherPaperclip" />
                                            <span>{file.name}</span>
                                        </div>
                                        <span onClick={removeFilesList}>x</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="submit--buttons">
                    <button>
                        <label htmlFor="add-file">파일 추가하기</label>
                        <input type="file" id="add-file" ref={fileInput} onChange={addFileList} />
                    </button>
                    <button
                        className={files.length === 0 ? "notOnFiles" : "onFiles"}
                        onClick={onClickSubmitFiles}
                    >제출하기</button>
                </div>
            </div>
        </Styled.TaskBottom>
    );
};

export default withRouter(TaskBottom);