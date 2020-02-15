import React, { useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import yes from '../../img/O.png';
import no from '../../img/X.png';

const List = ({ state, data, setHomeworkDataInState }) => {
    const { wooServer, accessToken } = state;
    const {
        id,
        created_at,
        homeworkType,
        homeworkTitle,
        submissionStatus,
        homework_deadline,
    } = data;

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
    const compareNowToDeadline = useCallback((deadline) => {
        const deadlineTime = new Date(deadline).getTime();
        const nowTime = new Date().getTime();
        return (deadlineTime - 172800000) <= nowTime; // 172800000 : A week
    }, []);

    return (
        <tr>
            <td>
                {compareNowToDeadline(homework_deadline) && <div><i></i></div>}
                {homeworkType === 0 ? "개인" : (homeworkType === 1 ? "팀" : "실험")}
            </td>
            <td>
                <span>
                    <Link 
                        to={`/task/${id}`} 
                        onClick={() => {
                            setHomeworkDataInState(wooServer, accessToken, id);
                        }}
                    >
                        {homeworkTitle}
                    </Link>
                </span>
            </td>
            <td>{getFullTime(created_at)}</td>
            <td className={compareNowToDeadline(homework_deadline) ? "urgent" : "relaxed"}>
                {getFullTime(homework_deadline)}
            </td>
            {homeworkType !== 0 
                ? (submissionStatus
                    ? <td><img src={yes} alt="yes" /></td>
                    : <td><img src={no} alt="no" /></td>)
                : (<td></td>)}
            {submissionStatus
                ? <td><img src={yes} alt="yes" /></td>
                : <td><img src={no} alt="no" /></td>}
        </tr>
    )
};

export default withRouter(List);