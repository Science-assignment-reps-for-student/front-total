import React, { useState, useEffect, useCallback } from 'react';
import { Header, BackgroundWhite } from '../public';
import * as S from './style/MainStyle';
import { MainContent, MainNav } from './component';
import { personalHomeworkURL, teamHomeworkURL, getUserInfoURL, experimentHomeworkURL, allFileDownloadURL, getFileCodeURL, excelFileDownloadURL } from '../resource/serverURL.js';
import { getUserInfo, getSubscribe, errorTypeCheck, getIsExpiration, refreshAccessToken } from '../resource/publicFunction';
import { withRouter } from 'react-router-dom'
import axios from 'axios';

const AdminMain = ({ state, actions, history, stomp }) => {

    const [ isLoaded, _loadedChange ] = useState();
    const [ data, _dataChange ] = useState({
        personal: {
            homework_info: [],
            homework_type: 0
        },
        team: {
            homework_info: [],
            homework_type: 1
        },
        experiment: {
            homework_info: [],
            homework_type: 2
        },
    });
    const [ content, _contentChange ] = useState({
        personal: [],
        team: [],
        experiment: [],
    });
    const [ checked, _checkedChange] = useState({
        class_1: true,
        class_2: true,
        class_3: true,
        class_4: true,
    });
    const [ homeworkType, _typeChange ] = useState({
        personal: true,
        team: false,
        experiment: false,
    })

    const [ count, countChange ] = useState(5)
    const [isSubscribe, subscribeChange] = useState(false);

    const { accessToken, refreshToken } = state;
    
    const header = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    const fileHeader = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        responseType: "blob",
    }

    const loadedChange = useCallback((e)=> {
        _loadedChange(e);
    },[])

    const dataChange = useCallback((e)=> {
        _dataChange(e)
    },[])

    const contentChange = useCallback((e)=> {
        _contentChange(e);
    },[])

    const typeChange = useCallback((e)=> {
        _typeChange(e);
    },[])

    const checkedChange = useCallback((e)=>{
        _checkedChange(e);
    },[])

    useEffect(()=> {
        const isAdmin = getUserInfo(getUserInfoURL,accessToken);
        isAdmin
        .then((userType)=> {
            console.log(userType)
            if(userType){
                // yes admin
                getPersonalHomework(personalHomeworkURL,header,checked,data,content);
                return;
            } 
            // not admin
            history.push('/');
        })
        .catch((err)=> {
            console.log(err);
            if(getIsExpiration(err)){
                refreshAccessToken(refreshToken,actions);
            } else {
                history.push('/admin/Login');
            }
        })
    },[]);

    useEffect(()=> {
        getSubscribe(stomp,subscribeChange);
        if(stomp && isSubscribe){
            return ()=> {
                stomp.unsubscribe();
            }
        }
    },[stomp])

    useEffect(()=> {
        if(isLoaded){
            const keys = Object.keys(data);
            const contentBuffer = Object.assign({},content);
            keys.map((key)=> {
                const { homework_info, homework_type } = data[key];
                contentBuffer[key] = makeContent(homework_info,homework_type,checked);
                return key;
            })
            contentChange(contentBuffer);
        }
    }, [checked]);

    const downloadFile = (fileName,file) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        link.download = fileName;
        link.click();
    }
    
    const fileErrorCheck = (errResponse) => {
        try{
            const statusCode = errResponse.response.status;
            if(statusCode === 404){
                alert("파일이 없습니다");
            } else if(statusCode === 412) {
                alert("파일이 생성되지 않았습니다.");
            } else {
                errorTypeCheck(errResponse,refreshToken,actions,history);
            }
        } catch{
            alert("네트워크를 확인해 주세요.");
        }
    }

    const getFileCodePromise = (contentId) => new Promise((resolve,reject)=> {
        axios.get(`${getFileCodeURL}/${contentId}`,header)
        .then((response)=> {
            resolve(response);
        })
        .catch((err)=> {
            reject(err);
        })
    })

    const zipFileDownload = (contentId) => {
        const fileCodePromise = getFileCodePromise(contentId);
        fileCodePromise
        .then((response)=> {
            const zipName = response.data.file_zip_info;
            axios.get(`${allFileDownloadURL}/${contentId}`,fileHeader)
            .then((response)=> {
                downloadFile(zipName,response.data);
            })
        })
        .catch((err)=> {
            fileErrorCheck(err);
        })
    }

    
    const makeContent = (data,type,checked) => {
        let buffer = [];
        data.map((contentData)=> {
            const { created_at, homework_description, homework_id, homework_title, ...classData } = contentData;
            buffer.push(<MainContent 
                type={type} 
                checked={checked} 
                title={homework_title} 
                classData={classData} 
                key={homework_id} 
                contentId={homework_id}
                fileDownload={zipFileDownload}
                created_at={created_at}
                getExcelFile={getExcelFile}
                />);
            return contentData;
        });
        return buffer;
    }

    const getExperimentHomework = (url,header,checked,data,content) => {
        axios.get(url,header)
        .then((e)=> {
            const homeworkData = e.data;
            const { homework_info, homework_type } = homeworkData;
            content.experiment = makeContent(homework_info,homework_type,checked);
            data.experiment = homeworkData;
            dataChange(data);
            contentChange(content);
            loadedChange(true);
        })
        .catch((e)=> {
            errorTypeCheck(e,refreshToken,actions,history);
        })
    }

    const getTeamHomework = (url,header,checked,data,content) => {
        axios.get(url,header)
        .then((e)=> {
            const homeworkData = e.data;
            const { homework_info, homework_type } = homeworkData;
            content.team = makeContent(homework_info,homework_type,checked);
            data.team = homeworkData;
            getExperimentHomework(experimentHomeworkURL,header,checked,data,content);
        })
        .catch((e)=> {
            errorTypeCheck(e,refreshToken,actions,history);
        })
    }

    const getPersonalHomework = (url,header,checked,data,content) => {
        axios.get(url,header)
        .then((e)=> {
            const homeworkData = e.data;
            const { homework_info, homework_type } = homeworkData;
            const contentBuffer = Object.assign({},content);
            const dataBuffer = Object.assign({},data);
            contentBuffer.personal = makeContent(homework_info,homework_type,checked);
            dataBuffer.personal = homeworkData;
            getTeamHomework(teamHomeworkURL,header,checked,dataBuffer,contentBuffer);
        })
        .catch((e)=> {
            errorTypeCheck(e,refreshToken,actions,history);
        })
    }

    const sortContentList = (contentList) => {
        contentList.sort((prev,next)=> {
            if(prev.props.created_at < next.props.created_at){
                return 1;
            } else if(prev.props.created_at > next.props.created_at){
                return -1;
            } else {
                return 0;
            }
        });
        return contentList
    }

    const getArrowHomework = (homeworkType,content) => {
        const typeKey = Object.keys(homeworkType);
        let buffer = [];
        let result = [];
        typeKey.map((key)=> {
            if(homeworkType[key]){
                buffer = [...buffer,...content[key]];
            }
            return key;
        });
        sortContentList(buffer);
        for(let i = 0 ;i < count;i++){
            if(buffer[i]){  
                result.push(buffer[i]);
            }
        }
        return result;
    }

    const isHomeworkTypeAllTrue = (homeworkType) => {
        return homeworkType.personal || homeworkType.team || homeworkType.experiment;
    }

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight } = e.target;
        if(scrollHeight - scrollTop < 900 && isHomeworkTypeAllTrue(homeworkType)){
            countChange(count+5);
        }
    };

    const excelFileUpdate = (contentId) => new Promise((resolve,reject) => {
        axios.put(`${excelFileDownloadURL}/${contentId}`,{},header)
        .then(()=> {
            resolve();
        })
        .catch((err)=> {
            reject(err);
        })
    })

    const getExcelFile = (contentId) => {
        const fileCodePromise = getFileCodePromise(contentId);
        fileCodePromise
        .then((e)=> {
            const excelFileUpdatePromise = excelFileUpdate(contentId);
            excelFileUpdatePromise
            .then(()=> {
                const { file_excel_name } = e.data;
                axios.get(`${excelFileDownloadURL}/${contentId}`,fileHeader)
                .then((e)=> {
                    const excelFile = e.data;
                    downloadFile(file_excel_name,excelFile);
                })
                .catch((err)=> {
                    fileErrorCheck(err);
                })
            })
            .catch((err)=> {
                fileErrorCheck(err);
            })
        })
        .catch((err)=> {
            fileErrorCheck(err)
        })
    }

    return (
        <>
            <Header actions={actions} state={state}/>
            <BackgroundWhite>
                <S.MainDiv onScroll={handleScroll}>
                    <div>
                        <h1>제출 현황</h1>
                        <hr/>
                        {
                            isLoaded ? getArrowHomework(homeworkType, content).length > 0 ? getArrowHomework(homeworkType,content) : "과제가 없습니다" : 
                            <S.MainLoadingContent>
                                <div className="loadingio-spinner-gear-navzgsfup8"><div className="ldio-dlvqi1wu39l">
                                <div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                </div></div>
                            </S.MainLoadingContent>
                        }
                    </div>
                    <div className="MainNavDiv">
                        <MainNav typeChange={typeChange} checkedChange={checkedChange} checked={checked} type={homeworkType}/>
                    </div>
                </S.MainDiv>
            </BackgroundWhite>
        </>
    )
}

export default withRouter(AdminMain);