import React, { useState, useCallback } from 'react';
import * as S from '../style/MainStyle';
import { download } from '../imgs';

const MainTeamListContent = ({ 
    teamList, 
    submit, 
    teamName, 
    count, 
    getFileCode 
}) => {
    const color = count % 2 === 0 ? "#F5F5F5" : "white";
    const [mouseOver, mouseOverChange] = useState(false);
    const mouseOverHandler = useCallback((event)=> {
        mouseOverChange(true);
        console.log("mouseOver")
    }, []);
    const mouseOutHandler = useCallback(()=> {
        mouseOverChange(false);
        console.log("mouseLeave")
    }, []);  
    return (
        <>
            <S.MainTeamListContent 
                color={color} 
                onMouseEnter={mouseOverHandler} 
                onMouseOut={mouseOutHandler}
            >
                {
                    mouseOver ?
                        <td 
                        className="hoverable" 
                        onClick={()=>{getFileCode(teamName)}}
                        colSpan={3}
                        >
                            다운로드 하기
                            <img alt="" src={download}/>
                        </td> :
                        (
                            <>
                                <td className="team" colSpan={2}><b>{teamName}</b></td>
                                <td className="status">{submit > 0 ? submit === 1 ? "✔️" : "⚠️" : "❌"}</td>
                            </>
                        ) 
                }
            </S.MainTeamListContent>
            {
                teamList.map((info)=> {
                    const { member_name, member_number } = info;
                        return (
                            <S.MainTeamListContent color={color} onClick={()=> {getFileCode(teamName)}}>
                                <td>{member_number}</td>
                                <td>{member_name}</td>
                                <td></td>
                            </S.MainTeamListContent>
                        )
                    }
                )
            }
        </>
    )
}

export default React.memo(MainTeamListContent);