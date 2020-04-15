import React, { useCallback } from 'react';
import * as S from '../style/HomeworkStyle';
import { HomeworkTitle } from '../component';

const HomeworkMain = ({ 
    title,
    category,
    categoryChange,
    titleChange,
    contentChange,
    content,
}) => {

    const inputChange = useCallback((e) => {
        contentChange(e.target.value)
    },[contentChange])

    return (
        <S.HomeworkMain>
            <h2>과제정보</h2>
            <HomeworkTitle 
                category={category}
                title={title}
                categoryChange={categoryChange}
                titleChange={titleChange}
            />
            <S.HomeworkExplain 
                onChange={inputChange} 
                placeholder="과제 설명" 
                value={content}
            />
        </S.HomeworkMain>
    )
}

export default HomeworkMain;