/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { FixingBody } from './style';
import FixingTitle from './components/FixingTitle';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const expecteReducer = (state, action) => {
    switch (action.type) {
        case "top":
            return {
                ...state,
                top: action.data
            }
        case "bottom":
            return {
                ...state,
                bottom: action.data
            }
        default:
            return state;
    }
}

const Fixing = () => {
    const [maintenance, setMaintenance] = useState("");
    const [expectedTimeState, expectedTimeDispatch] = useReducer(expecteReducer, {
        "top": "",
        "bottom": ""
    });

    const getMaintenance = useCallback(() => {
        axios({
            method: "GET",
            url: "http://54.180.174.253:5410/sirloin/maintenance"
        }).catch((v) => {
            if (typeof v.response === "undefined") return;
            const res = v.response;
            switch (res.status) {
                case 500:
                    return;
                case 503:
                    setMaintenance(res.data.finish_at);
                    break;
                default:
                    break;
            }
        })
    }, [setMaintenance]);

    const setExpectedMaintenanceTime = useCallback(() => {
        if (maintenance === "") return;
        const date = new Date(maintenance);
        expectedTimeDispatch({ type: "top", data: `${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours() - 9}시 ${date.getMinutes()}분` });
        expectedTimeDispatch({ type: "bottom", data: `${date.getHours() - 9}:${date.getMinutes()}, ${date.getMonth() + 1}월 ${date.getDate()}일` });
    }, [maintenance]);

    useEffect(() => {
        getMaintenance();
    }, []);
    useEffect(() => {
        setExpectedMaintenanceTime();
    }, [maintenance]);

    return (
        <FixingBody>
            <div>
                <FixingTitle fontSize="40">🔧점검 중입니다.🔧</FixingTitle>
                <FixingTitle fontSize="40">예상 점검 완료 시간은 {expectedTimeState.top}입니다.</FixingTitle>
                <FixingTitle fontSize="32">Maintenance [{expectedTimeState.bottom}]</FixingTitle>
                <button onClick={useHistory().goBack}>이전 페이지 가기</button>
            </div>
        </FixingBody>
    )
}

export default Fixing;