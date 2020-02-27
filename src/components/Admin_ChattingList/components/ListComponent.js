import React from 'react';
import * as S from '../style/ChattingListStyle';
import { withRouter } from 'react-router-dom'

const ListComponent = ({ number, text, name, date, isNew, isHeader, userId, history }) => {

    const clickHandler = () => {
        history.push(`/Admin/Chatting/${userId}`);
    }

    return (
        <S.ChattingListComponent isHeader={isHeader} onClick={clickHandler}>
            {isNew ? <div className="alarm"></div> : ""}
            <div>{number}</div>
            <div>{name}</div>
            <div className="text">{text}</div>
            <div>{date}</div>
        </S.ChattingListComponent>
    )
}

export default withRouter(ListComponent);