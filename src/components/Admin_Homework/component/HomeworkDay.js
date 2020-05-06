import React, { useCallback } from 'react';
import * as S from '../style/HomeworkStyle';
import {
    parseDate,
    reparseDate,
} from '../../resource/publicFunction';

const HomeworkDay = ({ dateChange, num, date }) => {

    const inputChange = useCallback((e) => {
        if(parseDate(e.target.value) < parseDate(new Date())){
            alert("이미 지난 날짜 입니다.")
            return;
        }
        const buffer = Object.assign({},date);
        const value = e.target.value;
        buffer[num] = value;
        dateChange(buffer);
    },[date,dateChange,num])



    return (
        <S.HomeworkDay>
            종료: 
            <S.HomeworkDayInput onChange={inputChange} value={date[num]} type="date"/>
        </S.HomeworkDay>
    )
}

export default React.memo(HomeworkDay);