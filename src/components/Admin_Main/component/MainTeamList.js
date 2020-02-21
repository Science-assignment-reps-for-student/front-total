import React, { useCallback } from 'react';
import * as S from '../style/MainStyle';
import { MainTeamListContent } from '../component';
import axios from 'axios';
import { getFileCodeURL, refreshAccessTokenURL, teamFileDownloadURL } from '../../resource/serverURL';
import { refreshAccessToken, getIsExpiration } from '../../resource/publicFunction';

const MainTeamList = ({ teamList, text, state, actions, contentId }) => {
    let count = 0;
    const { refreshToken, accessToken } = state;
    const header = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    }

    const teamFileDownload = (codeList,teamName) => {
        const downloadHeader = {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
            responseType: "blob"
        }
        codeList.map((e)=> {
            const { team_name, file_name, file_id } = e;
            if(teamName === team_name){
                axios.get(`${teamFileDownloadURL}/${file_id}`,downloadHeader)
                .then((file)=> {
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(file.data);
                    link.download = file_name;
                    link.click();
                })
                .catch((e)=> {
                    getIsExpiration(e) 
                    ? refreshAccessToken(refreshToken,actions,refreshAccessTokenURL) 
                    : alert("네트워크를 확인해 주세요.");
                })
            }
            return e;
        })
    }

    const getFileCode = (teamName) => {
        if(contentId){
            axios.get(`${getFileCodeURL}/${contentId}`,header)
            .then((e)=> {
                const codeList = e.data.file_info;
                teamFileDownload(codeList,teamName);
            })
            .catch((e)=> {
                if(e.response.status === 404){
                    alert("파일이 없습니다.")
                } else {
                    getIsExpiration(e) ? refreshAccessToken(refreshToken,actions,refreshAccessTokenURL) : alert("네트워크를 확인해 주세요.");
                }
            })
        }
    }


    return ( 
        <S.MainList>
            <p>{text}</p>
            <table>
                <tbody>
                    <S.MainListContent>
                        <th colSpan="2">팀</th>
                        <th>제출여부</th>
                    </S.MainListContent>
                    {
                        teamList.map((e)=> {
                            const { submit, team_name , team_info } = e;
                            count++;
                            return <MainTeamListContent submit={submit} teamName={team_name} teamList={team_info} count={count} getFileCode={getFileCode}/>
                        })
                    }
                </tbody>
            </table>
        </S.MainList>
    )
}

export default React.memo(MainTeamList);