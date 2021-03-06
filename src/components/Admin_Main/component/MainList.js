import React, { useCallback } from 'react';
import * as S from '../style/MainStyle';
import { MainListContent } from '../component';
import axios from 'axios';
import { 
    getFileCodeURL, 
    personalFileDownloadURL 
} from '../../resource/serverURL.js';
import { errorTypeCheck } from '../../resource/publicFunction';

const MainList = ({ 
    studentList, 
    text, 
    contentId, 
    state, 
    actions,
    isTeam,
}) => {

    const { accessToken, refreshToken } = state;
    const header = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
        }
    }
    
    const personalFileDownload = useCallback(
    (codeList,number) => {
        const downloadHeader = {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
            responseType: "blob"
        }
        codeList.map((e)=> {
            const { user_number, file_name, file_id } = e;
            if(number === user_number){
                axios.get(`${personalFileDownloadURL}/${file_id}`,downloadHeader)
                .then((file)=> {
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(file.data);
                    link.download = file_name;
                    link.click()
                })
                .catch((err)=> {
                    errorTypeCheck(err,refreshToken,actions);
                })
            }
            return e;
        })
    },[])

    const fileErrorCheck = useCallback(
        (errResponse) => {
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
    },[])

    const getFileCode = useCallback(
        (number) => {
        if(contentId){
            axios.get(`${getFileCodeURL}/${contentId}`,header)
            .then((e)=> {
                const codeList = e.data.file_info;
                personalFileDownload(codeList,number);
            })
            .catch((err)=> {
                if(err.response.status === 404){
                    alert("파일이 없습니다.")
                } else {
                    fileErrorCheck(err);
                }
            })
        }
    },[])

    return ( 
        <S.MainList>
            <p>{text}</p>
            <table>
                <tbody>
                    <S.MainListContent>
                        <th>학번</th>
                        <th>이름</th>
                        <th>제출여부</th>
                    </S.MainListContent>
                    {
                        studentList.map(({user_name,user_number,submit}) => 
                            <MainListContent name={user_name} number={user_number} isChecked={submit} getFile={getFileCode} isTeam={isTeam}/>)
                    }
                </tbody>
            </table>
        </S.MainList>
    )
}

export default MainList;