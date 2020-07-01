import React, { useState, useCallback } from 'react';
import * as S from '../style/MainStyle';
const MainListContent = ({ 
    number, 
    name, 
    isChecked, 
    getFile,
    isTeam,
}) => {
    const [mouseOver, mouseOverChange] = useState(false);
    const mouseOverHandler = useCallback((event)=> {
        mouseOverChange(true);
    }, []);
    const mouseOutHandler = useCallback(()=> {
        mouseOverChange(false);
    }, []);
    return (
        <S.MainListContent 
            onMouseEnter={mouseOverHandler} 
            onMouseOut={mouseOutHandler}
        >
            {
                mouseOver && !isTeam ? 
                <td 
                className="hoverable" 
                onClick={()=>{getFile(number)}}
                colSpan={3}
                >
                    다운로드 하기
                </td> :
                (
                    <>
                        <td>{number}</td>
                        <td>{name}</td>
                        <td>{isChecked ? isChecked === 1 ? "✔️" : "⚠️" : "❌"}</td>
                    </>
                )
            }
        </S.MainListContent>
    )
}

export default MainListContent;