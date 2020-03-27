import React, { useEffect, useState, useCallback, useReducer } from 'react';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import { getAccessTokenUsingRefresh } from '../resource/publicFunction';
import { InputList } from './component';
import * as Styled from './Styled';
import axios from 'axios';
import { Header } from '../../components';

const selfReducer = (state, action) => {
    switch (action.type) {
        case "scientificAccuracy":
            return { ...state, scientificAccuracy: +action.score };
        case "communication":
            return { ...state, communication: +action.score };
        case "attitude":
            return { ...state, attitude: +action.score };
        default:
            return state;
    }
};
const peerReducer = (state, action) => {
    const copy = [...state];
    switch (action.type) {
        case "cooperation":
            copy[action.num].cooperation = +action.score
            return copy;
        case "communication":
            copy[action.num].communication = +action.score
            return copy;
        default:
            return state;
    }
};

const PeerEvaluation = ({ state, taskActions, members, setMembers, getUserInfo, homeworkData, setHomeworkDataInState }) => {
    const history = useHistory();
    const { homework_title, homework_type } = homeworkData;
    const { limServer, wooServer, accessToken } = state;
    const { homeworkId } = useParams();
    const [my, setMy] = useState({});

    let [test, setTest] = useState();
    const [evaluationData, setEvaluationData] = useState({
        type: 0,
        title: "[팀] 정우영의 전구공장",
        selfType: ["scientificAccuracy", "communication", "attitude"],
        selfData: [
            {
                title: "과학적 정확성",
                subTitle: "실험 내용과 관련 과학 내용을 정확히 이해하고 있는가?",
            }, {
                title: "의사소통",
                subTitle: "모둠원들과 함께 문제 해결을 함께 고민하기 위해 다양한 의견을 제시하는 등 모둠 활동에 기여 하였는가?",
            }, {
                title: "공동체(협력)",
                subTitle: "모둠 활동에 적극적으로 참여하였으며, 맡은 역할을 충실히 참여하였는가?"
            }
        ],
        peerType: ["cooperation", "communication"],
        peerData: [
            {
                title: "공동체(협력)",
                subTitle: `실험에 적극적으로 참여하였으며 맡은 역할을 충실히 참여하였는가?`,
            }, {
                title: "의사소통",
                subTitle: `실험 과정에서 수시로 대화하며 의견을 나누었는가?\n실험 과정과 결과 등을 다른 모둠원에게 쉽게 설명할 수 있는가?`,
            }
        ],
        peerStudents: (!(members.members === undefined) && members.leaderNumber === my.userNumber) ?
            members.members :
            members.members === undefined ?
                [] :
                [
                    ...Array.from(members.members).filter((member) => member.userNumber !== my.number),
                    { userId: members.leaderId, userNumber: members.leaderNumber, userName: members.leaderName }
                ]
    });

    useEffect(() => {
        if (members.members === undefined) return;
        else {
            const copy = { ...evaluationData };
            if (+members.leaderNumber === +my.userNumber) {
                copy.peerStudents = members.members;
                setEvaluationData(copy);
            } else {
                copy.peerStudents = [
                    ...Array.from(members.members).filter((member) => +member.userNumber !== +my.userNumber),
                    { userId: members.leaderId, userNumber: members.leaderNumber, userName: members.leaderName }
                ];
                setEvaluationData(copy);
            }
        }
    }, [members, members.members, my]);

    const [seflState, selfDispatch] = useReducer(selfReducer, {
        scientificAccuracy: 0,
        communication: 0,
        attitude: 0
    });
    const [peerState, setPeerState] = useState([]);
    useEffect(() => {
        if (Object.keys(members).length === 0) return;
        else {
            setPeerState(members.members.map(() => {
                return { cooperation: 0, communication: 0 };
            }));
        }
    }, [members]);
    const peerStateChange = useCallback((e) => {
        const score = e.target.dataset.score, type = e.target.dataset.type, num = e.target.dataset.num, copy = [...peerState];
        copy[num][type] = +score;
        setPeerState(copy);
    }, [peerState]);

    const selfReducerHandler = useCallback((e) => {
        selfDispatch({ type: e.target.dataset.type, score: e.target.dataset.score })
    }, [selfDispatch]);
    const getSelfList = useCallback(() => {
        const list = evaluationData.selfData.map((data, i) => {
            return (
                <li key={i}>
                    <InputList
                        title={data.title}
                        subTitle={data.subTitle}
                        type={evaluationData.selfType[i]}
                        selfReducerHandler={selfReducerHandler}
                        i={i}
                    />
                </li>
            )
        });
        return list;
    }, [evaluationData]);
    const getPeerList = useCallback(() => {
        const list = evaluationData.peerStudents.map((student, i) => {
            return (
                <div key={i}>
                    <p className="evaluated-name" data-userId={student.userId}>{student.userNumber} {student.userName}</p>
                    {evaluationData.peerData.map((data, j) => {
                        return (
                            <InputList
                                i={i}
                                key={j}
                                title={data.title}
                                subTitle={data.subTitle}
                                type={evaluationData.peerType[j]}
                                peerStateChange={peerStateChange}
                            />
                        )
                    })}
                </div>
            )
        });
        return list;
    }, [evaluationData, my, members]);
    const submitSelfEvaluation = useCallback(() => {
        axios({
            method: "POST",
            url: `${limServer}/evaluation-self`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken,
            },
            data: {
                homeworkId: +homeworkId,
                scientificAccuracy: +seflState.scientificAccuracy,
                communication: +seflState.communication,
                attitude: +seflState.attitude,
            }
        }).then(() => {
            if (+homework_type === 0) {
                alert("평가가 성공적으로 제출되었습니다.");
            } else {
                submitPeerEvaluation();
                alert("평가를 성공적으로 제출하였습니다.");
            }
        }).catch((error) => {
            if (typeof error.response === "undefined") return;
            const code = error.response.status;
            if (code === 400)
                return alert("자기 평가를 이미 완료하였습니다.");
            else if (code === 410)
                getAccessTokenUsingRefresh(state, taskActions);
        }).finally(() => {
            history.go(-1);
        })
    }, [homeworkId, state, seflState]);
    const submitPeerEvaluation = useCallback(() => {
        evaluationData.peerStudents.map((student, i) => {
            axios({
                method: "POST",
                url: `${limServer}/evaluation-mutual`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": accessToken,
                },
                data: {
                    homeworkId: +homeworkId,
                    targetUuid: +student.userId,
                    cooperation: +peerState[i].cooperation,
                    communication: +peerState[i].communication,
                }
            }).catch((error) => {
                if (typeof error.response === "undefined") return;
                const code = error.response.status;
                if (code === 400)
                    return alert(`${student.userNumber} ${student.userName}에 대한 동료 평가를 이미 완료하였습니다.`);
                else if (code === 410)
                    getAccessTokenUsingRefresh(state, taskActions);
            })
        })
    }, [homeworkId, state, peerState]);
    const teamRequestGet = useCallback(() => {
        if (typeof homeworkId === "undefined") return;
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
            else if (code === 410)
                getAccessTokenUsingRefresh(state, taskActions);
        })
    }, [homeworkId, state, setMembers]);

    useEffect(() => {
        getUserInfo(limServer, accessToken).then((response) => {
            setMy(response.data);
        })
    }, []);
    useEffect(() => {
        if (Object.keys(homeworkData).length === 0)
            setHomeworkDataInState(wooServer, accessToken, homeworkId);
        if (homeworkData.homework_type !== 0)
            teamRequestGet();
    }, [homeworkData]);

    return (
        <>
            <Header />
            <Styled.PeerEvaluation>
                <div>
                    <h2>[{homework_type === 0 ? "개인" : homework_type === 1 ? "팀" : "실험"}] {homework_title}</h2>
                    <section>
                        <div className="evaluation-title">
                            <h3>동료평가</h3>
                            <span>{my.userNumber} {my.userName}</span>
                        </div>
                        <div className="evaluation-self">
                            <h4>1. 자신의 활동을 스스로 평가해 봅시다.</h4>
                            <ul>
                                <li>
                                    <ul className="evaluation-level"><li>상(3)</li><li>중(2)</li><li>하(1)</li></ul>
                                </li>
                                {getSelfList()}
                            </ul>
                        </div>
                        {homework_type !== 0 &&
                            <div className="evaluation-peer">
                                <h4>2. 자신이 속한 모둠 활동을 평가해 봅시다.</h4>
                                <ul>
                                    <li>
                                        <ul className="evaluation-level"><li>상(3)</li><li>중(2)</li><li>하(1)</li></ul>
                                    </li>
                                    <li>
                                        {getPeerList()}
                                    </li>
                                </ul>
                            </div>
                        }
                        <div className="evaluation-submit">
                            <button onClick={() => {
                                if (seflState.scientificAccuracy === 0 || seflState.communication === 0 || seflState.attitude === 0)
                                    return alert("자기 평가를 다시 한번 확인해주세요.");
                                if (peerState.some((data) => data.cooperation === 0 || data.communication === 0))
                                    return alert("동료 평가를 다시 한번 확인해주세요.");
                                if (!window.confirm("정말 제출하시겠습니까?")) return;
                                submitSelfEvaluation();
                            }}>제출하기</button>
                        </div>
                    </section>
                </div>
            </Styled.PeerEvaluation>
        </>
    )
};

export default withRouter(PeerEvaluation);