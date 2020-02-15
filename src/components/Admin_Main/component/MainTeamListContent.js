import React from 'react';
import * as S from '../style/MainStyle';

const MainTeamListContent = ({ teamList, submit, teamName, count, getFileCode }) => {
    const color = count % 2 === 0 ? "#F5F5F5" : "white";  
    return (
        <>
            <S.MainTeamListContent color={color} onClick={()=> {getFileCode(teamName)}}>
                <td colSpan={2}><b>{teamName}</b></td>
                <td>{submit > 0 ? submit === 1 ? "O" : "△" : "X"}</td>
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