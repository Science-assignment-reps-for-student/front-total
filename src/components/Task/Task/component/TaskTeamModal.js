import React, { useCallback, useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { getAccessTokenUsingRefresh } from '../../../resource/publicFunction';
import * as Styled from '../Styled';
import close from '../../img/X.png';
import axios from 'axios';

const TaskTeamModal = ({ state, taskActions, onClickToggleModal, setMembers, members, getUserInfo, allMembers, teamRequestGet }) => {
    const history = useHistory();
    const { accessToken, limServer } = state;
    const [my, setMy] = useState({});

    const onClickAddMember = useCallback((member) => {
        const copy = { ...members };
        const { userId, userName, userNumber } = member;
        if ((copy.members.findIndex(i => i.userId === userId)) !== -1)
            return copy;
        copy.members.push({ userId: userId, userNumber: userNumber, userName: userName });
        setMembers(copy);
    }, [members]);
    const onClickRemoveMember = useCallback((member) => {
        const copy = { ...members };
        const { userId } = member;
        const idx = copy.members.findIndex((i) => (i.userId === userId));
        copy.members.splice(idx, 1);
        setMembers(copy);
    }, [members]);
    const onClickStyleMember = useCallback((e) => {
        const target = e.target;
        target.classList.add("clicked");
        setTimeout(() => {
            target.classList.remove("clicked");
        }, 500);
    }, []);
    const memberRequest = useCallback((requestType, member) => {
        if (typeof accessToken === "object") return;
        axios({
            url: `${limServer}/member/${member.userId}?teamId=${members.teamId}`,
            method: requestType,
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken,
            },
        }).then(() => {
            requestType === "post" ? onClickAddMember(member) : onClickRemoveMember(member);
        }).catch((error) => {
            if (typeof error.response === "undefined") return;
            const code = error.response.status;
            if (code === 400)
                alert("이미 팀에 가입된 학생입니다.");
            else if (code === 403)
                history.push("/");
            else if (code === 410)
                getAccessTokenUsingRefresh(state, taskActions);
        })
    }, [members, state]);
    const getSelectedMembers = useCallback((array) => {
        const selectedMemebers = array.map((member, i) => {
            return (
                <li key={i}>
                    <span>{member.userNumber}</span>
                    <span>{member.userName}</span>
                    <span>
                        <i onClick={() => { memberRequest("delete", member); }}></i>
                    </span>
                </li>
            )
        })
        return selectedMemebers;
    }, [members, memberRequest]);
    const selectedMemberFilter = useCallback(({ userId }) => {
        return members.members.some((mem) => mem.userId === userId)
    }, [members]);
    const sameClassFilter = useCallback(({ userNumber }) => {
        return my.userNumber.toString()[1] === userNumber.toString()[1];
    }, [my]);
    const getAllMemberList = useCallback(() => {
        if (typeof members.members !== "object" || my.userId === undefined) return;
        const list = allMembers
            .filter((member) => (member.userId !== my.userId) && !selectedMemberFilter(member) && sameClassFilter(member))
            .map((member, i) => {
                return (
                    <li
                        key={i}
                        onClick={() => memberRequest("post", member)}
                    >
                        <span>{member.userNumber}</span>
                        <span>{member.userName}</span>
                    </li>
                )
            })
        return list;
    }, [allMembers, onClickStyleMember, memberRequest, my, members]);

    useEffect(() => {
        getUserInfo(limServer, accessToken).then((response) => {
            setMy(response.data);
        })
        return () => {
            teamRequestGet();
        }
    }, []);

    return (
        <>
            {typeof members === "object" &&
                <Styled.TaskTeamModal className="team-member-modal">
                    <div className="team-member--background"></div>
                    <div className="team-member--editer">
                        <div className="editer--searching">
                            <div className="editer--searching_li">
                                <ul>
                                    <li>
                                        <span>학번</span>
                                        <span>이름</span>
                                    </li>
                                    {getAllMemberList()}
                                </ul>
                            </div>
                        </div>
                        <div className="editer--members">
                            <div>
                                <h4>팀원</h4>
                                <img src={close} alt="close" onClick={onClickToggleModal} />
                            </div>
                            <div>
                                <ul>
                                    <li><span>학번</span><span>이름</span></li>
                                    {getSelectedMembers(members.members)}
                                </ul>
                            </div>
                            <button onClick={onClickToggleModal}>팀원 수정</button>
                        </div>
                    </div>
                </Styled.TaskTeamModal>
            }
        </>
    );
};

export default withRouter(TaskTeamModal);