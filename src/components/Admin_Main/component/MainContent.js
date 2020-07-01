import React, { 
    useState, 
    useCallback 
} from 'react';
import * as S from '../style/MainStyle';
import { 
    MainClass, 
    MainTeamClass, 
    MainExperimentClass
} from '../component';
import { 
    edit, 
    excel, 
    download 
} from '../imgs';
import { withRouter } from 'react-router-dom';

const MainContent = ({ 
    checked, 
    title, 
    classData, 
    type, 
    contentId, 
    history, 
    fileDownload, 
    created_at, 
    getExcelFile,
}) => {

    const classDataKey = Object.keys(classData);
    const filteredData = classDataKey.filter((e)=> checked[e]);
    const [isFolder, _folderChange] = useState(false);
    const folderChange = useCallback((e)=> {
        _folderChange(e);
    },[]);

    const classToInt = useCallback(
    (string) => {
        switch(string){
            case "class_1":
                return 1;
            case "class_2":
                return 2;
            case "class_3":
                return 3;
            case "class_4":
                return 4;
            default:
                return 0;
        }
    },[])

    const getClass = useCallback(
    (classData, classDataKey, title) => {
        let buffer = [];
        classDataKey.map((key) => {
            const data = classData[key];
            const { deadline, submit_list } = data;
            buffer.push(<MainClass 
                num={classToInt(key)} 
                title={title} 
                studentList={submit_list} 
                deadline={deadline} 
                fileDownload={fileDownload}
                key={`${title}${key}`}
                contentId={contentId}
                type={type}
                created_at={created_at}
                ></MainClass>);

            return key;
        })
        return buffer;
    },[])

    const getTeamClass = useCallback(
    (classData, classDataKey, title) => {
        let buffer = [];
        classDataKey.map((key) => {
            const data = classData[key];
            const { deadline, personal_submit_list, team_submit_list } = data;
            buffer.push(<MainTeamClass 
                num={classToInt(key)} 
                title={title} 
                studentList={personal_submit_list} 
                teamList={team_submit_list} 
                deadline={deadline} 
                key={`${title}${key}`}
                fileDownload={fileDownload}
                contentId={contentId}
                type={type}
                created_at={created_at}
            ></MainTeamClass>);
            return key;
        })
        return buffer;
    },[])

    const getExperimentClass = useCallback(
    (classData, classDataKey, title) => {
        let buffer = [];
        classDataKey.map((key) => {
            const data = classData[key];
            const { env_submit_list, experiment_submit_list, deadline } = data;
            buffer.push(<MainExperimentClass 
                num={classToInt(key)} 
                title={title} 
                studentList={env_submit_list} 
                teamList={experiment_submit_list} 
                deadline={deadline} 
                key={`${title}${key}`}
                fileDownload={fileDownload}
                contentId={contentId}
                type={type}
                created_at={created_at}
            ></MainExperimentClass>);
            return key;
        })
        return buffer;
    },[])

    const getTitle = useCallback(
    (type,title) => {
        return getType(type) + title;
    },[])

    const getType = useCallback(
    (type) => { 
        switch(type){
            case 0: 
                return "[개인]";
            case 1:
                return "[팀]";
            case 2: 
                return "[실험]";
            default:
                return "error";
        }
    },[])

    return (
        <S.MainContent button={type !== 0} isFolder={isFolder}>
            <div onClick={() => folderChange(!isFolder)} className="wrapper">
                <h2>{getTitle(type,title)}</h2>
                <div onClick={(e)=> e.stopPropagation()} className="buttonWrapper">
                    <S.MainFixButton onClick={()=> {history.push(`/Admin/revise/${contentId}`)}}><img src={edit} alt=""/>수정</S.MainFixButton>
                    <S.MainFixButton onClick={() => {getExcelFile(contentId)}}><img src={excel} alt=""/>엑셀</S.MainFixButton>
                    <S.MainFixButton onClick={()=>{fileDownload(contentId)}}><img src={download} alt=""/>파일</S.MainFixButton>
                </div>
            </div>
            <hr/>
            <div className="classWrapper">
                {
                    type === 0 ? 
                    getClass(classData, filteredData, title) : 
                    type === 1 ? getTeamClass(classData, filteredData, title) : getExperimentClass(classData, filteredData, title)
                }
            </div>
        </S.MainContent>
    )
}

export default  withRouter(MainContent);