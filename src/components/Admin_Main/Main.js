import React, { useState, useEffect, useCallback } from 'react';
import { Header, BackgroundWhite } from '../public';
import * as S from './style/MainStyle';
import { MainContent, MainNav } from './component';
import { refreshAccessTokenURL, personalHomeworkURL, teamHomeworkURL, getUserInfoURL, experimentHomeworkURL, allFileDownloadURL, getFileCodeURL, excelFileDownloadURL } from '../resource/serverURL.js';
import { refreshAccessToken, getUserInfo, getIsExpiration } from '../resource/publicFunction';
import { withRouter } from 'react-router-dom'
import axios from 'axios';

const AdminMain = ({ state, actions, history }) => {

    const [ isLoaded, _loadedChange ] = useState();
    const [ data, _dataChange ] = useState({
        0: {
            homework_info: [],
            homework_type: 0
        },
        1: {
            homework_info: [],
            homework_type: 1
        },
        2: {
            homework_info: [],
            homework_type: 2
        },
    });
    const [ content, _contentChange ] = useState({
        0: [],
        1: [],
        2: [],
    });
    const [ checked, _checkedChange] = useState({
        class_1: true,
        class_2: true,
        class_3: true,
        class_4: true,
    });
    const [ homeworkType, _typeChange ] = useState({
        0: true,
        1: false,
        2: false,
    })

    const [ count, countChange ] = useState(5)

    const { accessToken, refreshToken } = state;
    
    const header = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
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
            if(!userType){
                history.push('/admin/Login');
            } else {
                getPersonalHomework(personalHomeworkURL,header,checked,data,content);
            }
        })
        .catch((e)=> {
            history.push('/admin/Login');
        })
    },[]);

    const allFileDownload = (contentId) => {
        const fileHeader = {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            responseType: "blob",
        }
        axios.get(`${getFileCodeURL}/${contentId}`,header)
        .then((e)=> {
            const zipName = e.data.file_zip_info;
            axios.get(`${allFileDownloadURL}/${contentId}`,fileHeader)
            .then((response)=> {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(response.data);
                link.download = zipName;
                link.click();
            })
        })
        .catch((e)=> {
            try{
                if(e.response.status === 404){
                    alert("파일이 없습니다");
                } else {
                    getIsExpiration(e) 
                    ? refreshAccessToken(refreshToken,actions,refreshAccessTokenURL) 
                    : alert("네트워크를 확인해 주세요.");
                }
            } catch{
                alert("네트워크를 확인해 주세요.")
            }
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
                fileDownload={allFileDownload}
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
            content[2] = makeContent(homework_info,homework_type,checked);
            data[2] = homeworkData;
            dataChange(data);
            contentChange(content);
            loadedChange(true);
        })
        .catch((e)=> {
            getIsExpiration(e) 
            ? refreshAccessToken(refreshToken,actions,refreshAccessTokenURL) 
            : alert("네트워크를 확인해 주세요.");
        })
    }

    const getTeamHomework = (url,header,checked,data,content) => {
        axios.get(url,header)
        .then((e)=> {
            const homeworkData = e.data;
            const { homework_info, homework_type } = homeworkData;
            content[1] = makeContent(homework_info,homework_type,checked);
            data[1] = homeworkData;
            getExperimentHomework(experimentHomeworkURL,header,checked,data,content);
        })
        .catch((e)=> {
            getIsExpiration(e) 
            ? refreshAccessToken(refreshToken,actions,refreshAccessTokenURL) 
            : alert("네트워크를 확인해 주세요.");
        })
    }

    const getPersonalHomework = (url,header,checked,data,content) => {
        axios.get(url,header)
        .then((e)=> {
            const homeworkData = e.data;
            const { homework_info, homework_type } = homeworkData;
            const contentBuffer = Object.assign({},content);
            const dataBuffer = Object.assign({},data);
            contentBuffer[0] = makeContent(homework_info,homework_type,checked);
            dataBuffer[0] = homeworkData;
            getTeamHomework(teamHomeworkURL,header,checked,dataBuffer,contentBuffer);
        })
        .catch((e)=> {
            getIsExpiration(e) 
            ? refreshAccessToken(refreshToken,actions,refreshAccessTokenURL) 
            : alert("네트워크를 확인해 주세요.");
        })
    }

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
        buffer.sort((prev,next)=> {
            if(prev.props.created_at < next.props.created_at){
                return 1;
            } else if(prev.props.created_at > next.props.created_at){
                return -1;
            } else {
                return 0;
            }
        });
        for(let i = 0 ;i < count;i++){
            if(buffer[i]){  
                result.push(buffer[i]);
            }
        }
        return result;
    }

    const isHomeworkTypeAllTrue = (homeworkType) => {
        return homeworkType[0] || homeworkType[1] || homeworkType[2];
    }

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight } = e.target;
        if(scrollHeight - scrollTop < 900 && isHomeworkTypeAllTrue(homeworkType)){
            countChange(count+5);
        }
    };

    const getExcelFile = (homework_num) => {
        axios.get(`${getFileCodeURL}/${homework_num}`,header)
        .then((e)=> {
            const { file_excel_name } = e.data;
            axios.get(`${excelFileDownloadURL}/${homework_num}`,{
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
                responseType: "blob"
            }
            ).then((e)=> {
                const excelFile = e.data;
                const link = document.createElement("a");
                link.href = URL.createObjectURL(excelFile);
                link.download = file_excel_name;
                link.click()
            })
            .catch((e)=> {
                try{
                    if(e.response.status === 404){
                        alert("과제가 끝나지 않아, 엑셀이 없습니다.");
                    } else {
                        refreshAccessToken(refreshToken,actions,refreshAccessTokenURL);
                    }
                } catch {
                    alert("네트워크를 확인해 주세요.");
                }
            })
        })
        .catch((e)=> {
            try{
                if(e.response.status === 404){
                    alert("파일이 없습니다.");
                } else {
                    refreshAccessToken(refreshToken,actions,refreshAccessTokenURL);
                }
            } catch {
                alert("네트워크를 확인해 주세요.")
            }
        })
    }

    return (
        <>
            <Header/>
            <BackgroundWhite>
                <S.MainDiv onScroll={handleScroll}>
                    <div>
                        <h1>제출 현황</h1>
                        <hr/>
                        {
                            getArrowHomework(homeworkType, content).length > 0 && isLoaded ? getArrowHomework(homeworkType,content) : 
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