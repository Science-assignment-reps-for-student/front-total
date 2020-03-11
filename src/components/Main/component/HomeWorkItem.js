import React from 'react';
import { HomeWorkItemWrapper } from '../styles';
import { Link } from 'react-router-dom';

const HomeWorkItem = ({ data, taskState, setHomeworkDataInState }) => {
    const { wooServer, accessToken } = taskState;

    return (
        <HomeWorkItemWrapper submit={data.submissionStatus}>
            <main>
                <h1>{data !== "undefined" && data.homeworkTitle}</h1>
                <div>
                    <p>{data !== "undefined" && new Date(data['created_at']).yyyymmddWithDot()} - {data !== "undefined" && new Date(data['homework_deadline']).yyyymmddWithDot()}</p>
                    <span>{data !== "undefined" && Date.prototype.getDDay(data['homework_deadline'])}</span>
                </div>
            </main>
            <footer>
                <span>[{data !== "undefined" && data.homeworkType === 0 ? '개인' : data.homeworkType === 1 ? '팀' : '실험'}]</span>
                {data !== "undefined" &&
                    <Link 
                        to={`/task/${data.id}`} 
                        onClick={() => {
                            if (typeof accessToken === "object") return;
                            setHomeworkDataInState(wooServer, accessToken, data.id);
                        }}
                        title="과제 바로가기"
                    >
                        <span>{data !== "undefined" && data.submissionStatus ? '제출함' : '제출하지 않음'}</span>
                    </Link>
                }
            </footer>
        </HomeWorkItemWrapper>
    );
};

export default HomeWorkItem;