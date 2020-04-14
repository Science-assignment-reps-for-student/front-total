import React from 'react';
import * as S from '../style/MainStyle';
const MainListContent = ({ 
    number, 
    name, 
    isChecked, 
    getFile 
}) => {
    return (
        <S.MainListContent onClick={()=>{getFile(number)}}>
            <td>{number}</td>
            <td>{name}</td>
            <td>{isChecked ? isChecked === 1 ? "✔️" : "⚠️" : "❌"}</td>
        </S.MainListContent>
    )
}

export default MainListContent;