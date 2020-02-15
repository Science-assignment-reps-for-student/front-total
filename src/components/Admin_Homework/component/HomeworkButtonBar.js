import React from 'react';
import * as S from '../style/HomeworkStyle';
import { save, trash } from '../imgs';
import { withRouter } from 'react-router-dom'

const HomeworkButtonBar = ({ setHomework, patchHomework, deleteHomework, type, history }) => {
    return (
        <S.HomeworkButtonDiv>
            <S.HomeworkButton onClick={type === "Fix" ? patchHomework : setHomework}>
                <img src={save} alt="save"/>
                <p>저장</p>
            </S.HomeworkButton>
            <S.HomeworkButton onClick={type === "Fix" ? deleteHomework : ()=> {history.push('/admin')}}>    
                <img src={trash} alt="save"/>
                <p>삭제</p>
            </S.HomeworkButton>
        </S.HomeworkButtonDiv>
    )
}

export default React.memo(withRouter(HomeworkButtonBar));