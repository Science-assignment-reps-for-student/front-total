import React from 'react';
import { Link } from 'react-router-dom';
import { HomeWorkBoardItemWrapper } from '../styles';
import oIcon from '../img/oIcon.png';
import xIcon from '../img/xIcon.png';
import importantIcon from '../img/importantIcon.png';

const HomeworkBoardItem = ({ data, isTeam, isImportant }) => {
    return (
        <HomeWorkBoardItemWrapper isImportant={isImportant}>
            <span>{data !== "undefined" && data.homeworkType === 0 ? '개인' : data.homeworkType === 1 ? '팀' : '실험'}</span>
            <span>
                <Link to={`task/${data.id}`}>{data !== "undefined" && data.homeworkTitle}</Link>
            </span>
            <span>{data !== "undefined" && new Date(data['created_at']).yyyymmddWithDot()}</span>
            <span>{data !== "undefined" && new Date(data['homework_deadline']).yyyymmddWithDot()}</span>
            <span><img alt="팀아이콘" src={isTeam !== null && isTeam ? oIcon : xIcon} /></span>
            <span><img alt="제출현황아이콘" src={data !== "undefined" && data.submissionStatus ? oIcon : xIcon} /></span>
            {isImportant && <img alt="중요아이콘" src={importantIcon} />}
        </HomeWorkBoardItemWrapper>
    );
};

export default HomeworkBoardItem;