import React from 'react';
import * as S from '../style/MainStyle';
import { MainTeamListContent } from '../component';
import axios from 'axios';
import { getFileCodeURL, teamFileDownloadURL } from '../../resource/serverURL.js';
import { errorTypeCheck } from '../../resource/publicFunction';

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
                .catch((err)=> {
                    errorTypeCheck(err,refreshToken,actions)
                })
            }
            return e;
        })
    }

    const fileErrorCheck = (errResponse) => {
        try{
            const statusCode = errResponse.response.status
            if(statusCode === 404){
                alert("파일이 없습니다");
            } else {
                errorTypeCheck(errResponse,refreshToken,actions);
            }
        } catch{
            alert("네트워크를 확인해 주세요.")
        }
    }

    const getFileCode = (teamName) => {
        if(contentId){
            axios.get(`${getFileCodeURL}/${contentId}`,header)
            .then((e)=> {
                const codeList = e.data.file_info;
                teamFileDownload(codeList,teamName);
            })
            .catch((err)=> {
                if(err.response.status === 404){
                    alert("파일이 없습니다.")
                } else {
                    fileErrorCheck(err);
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