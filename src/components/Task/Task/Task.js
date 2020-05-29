import React, { useState, useCallback, useEffect } from 'react';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import { getAccessTokenUsingRefresh } from '../../resource/publicFunction';
import * as Styled from './Styled';
import { TaskTop, TaskBottom, TaskTeamModal } from './component';
import axios from 'axios';
import { Header } from '../../../components';

const Task = ({ state, taskActions, members, setMembers, getUserInfo, homeworkData, setHomeworkDataInState }) => {
    const history = useHistory();
    const { limServer, wooServer, accessToken } = state;
    const { homeworkId } = useParams();
    const [modal, setModal] = useState(false);
    const [allMembers, setAllMembers] = useState([]);

    const onClickToggleModal = useCallback(() => setModal(!modal), [modal]);
    const teamRequestGet = useCallback(() => {
        if (homeworkId === "undefined") return;
        if (typeof accessToken === "object") return;
        else {
            axios.get(`${limServer}/team?homeworkId=${homeworkId}`, {
                headers: {
                    Authorization: accessToken,
                    "Content-Type": "multipart/form-data",
                }
            }).then((response) => {
                setMembers(response.data);
            }).catch((error) => {
                if (typeof error.response === "undefined") return;
                const code = error.response.status;
                if (code === 403)
                    history.push("/");
                else if (code === 404)
                    setMembers([]);
                else if (code === 410)
                    getAccessTokenUsingRefresh(state, taskActions);
            })
        }
    }, [homeworkId, state, setMembers]);
    const getAllStudentsRequest = useCallback(() => {
        if (typeof accessToken === "object") return;
        axios.get(`${limServer}/search?query=`, {
            "headers": {
                "Content-Type": "multipart/form-data",
                "Authorization": accessToken,
            }
        }).then((response) => {
            setAllMembers(response.data);
        }).catch((error) => {
            if (typeof error.response === "undefined") return;
            const code = error.response.status;
            if (code === 403)
                history.push("/");
            else if (code === 410)
                getAccessTokenUsingRefresh(state, taskActions);
        })
    }, [state]);

    useEffect(() => {
        getAllStudentsRequest();
    }, []);
    useEffect(() => {
        if (Object.keys(homeworkData).length === 0) {
            if (typeof accessToken === "object") return;    
            setHomeworkDataInState(wooServer, accessToken, homeworkId);
        }
    }, [homeworkId]);

    return (
        <>
            <Header/>
            <Styled.Task>
                <div>
                    <TaskTop
                        state={state}
                        members={members}
                        homeworkId={homeworkId}
                        getUserInfo={getUserInfo}
                        homeworkData={homeworkData}
                    />
                    <TaskBottom
                        state={state}
                        members={members}
                        setMembers={setMembers}
                        homeworkId={homeworkId}
                        getUserInfo={getUserInfo}
                        homeworkData={homeworkData}
                        teamRequestGet={teamRequestGet}
                        onClickToggleModal={onClickToggleModal}
                    />
                    {modal && <TaskTeamModal
                        state={state}
                        members={members}
                        setMembers={setMembers}
                        allMembers={allMembers}
                        getUserInfo={getUserInfo}
                        teamRequestGet={teamRequestGet}
                        onClickToggleModal={onClickToggleModal}
                    />}
                </div>
            </Styled.Task>
        </>
    )
};

export default withRouter(Task);