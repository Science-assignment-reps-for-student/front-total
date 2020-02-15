import React from 'react';
import * as S from '../style/HomeworkStyle';
import { HomeworkFile, HomeworkDay } from '../component';

const HomeworkNav = ({ NavInfo, NavInfoChange }) => {

    const { file, date } = NavInfo;
    const { fileChange, dateChange } = NavInfoChange;

    return (
        <S.HomeworkNav>
            <p>반 정보</p>
            <S.HomeworkLine/>
            <S.HomeworkCheckBox>
                1반
            <HomeworkDay dateChange={dateChange} num={1} date={date} />
            </S.HomeworkCheckBox>
            <S.HomeworkCheckBox>
                2반
                <HomeworkDay dateChange={dateChange} num={2} date={date}/>
            </S.HomeworkCheckBox>
            <S.HomeworkCheckBox>
                3반
                <HomeworkDay dateChange={dateChange} num={3} date={date}/>
            </S.HomeworkCheckBox>
            <S.HomeworkCheckBox>
                4반
                <HomeworkDay dateChange={dateChange} num={4} date={date}/>
            </S.HomeworkCheckBox>
            <S.HomeworkLine/>
            <HomeworkFile file={file} fileChange={fileChange}/>
        </S.HomeworkNav>
    )
}

export default React.memo(HomeworkNav);