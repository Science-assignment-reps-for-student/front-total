import React, { 
    useState, 
    useCallback, 
    useEffect 
} from 'react';
import { 
    Header, 
    BackgroundBlack 
} from '../public';
import * as S from './style/HomeworkStyle';
import { 
    HomeworkNav, 
    HomeworkButtonBar, 
    HomeworkMain 
} from './component';
import axios from 'axios';
import { 
    homeworkURL, 
    getUserInfoURL 
} from '../resource/serverURL';
import { 
    parseDate, 
    reparseDate,
    getUserInfo, 
    getSubscribe, 
    errorTypeCheck
} from '../resource/publicFunction';

import { 
    withRouter,
    useParams 
} from 'react-router-dom';


const Admin_Homework = ({ 
    state, 
    type, 
    history, 
    actions, 
    stomp 
}) => {
    const { homeworkNum } = useParams();
    const { accessToken, refreshToken } = state;
    const header = {
        headers: {
            "Authorization": `Baerer ${accessToken}`
        }
    }
    const [date, _dateChange] = useState({
        1: "",
        2: "",
        3: "",
        4: "",
    });
    const [content, _contentChange] = useState("");
    const [file, _fileChange] = useState([]);
    const [title, _titleChange] = useState("");
    const [category, _categoryChange] = useState(-1);
    const [isSubscribe,subscribeChange] = useState(false);

    const fileChange = useCallback((e) => {
        _fileChange(e);
    },[]);

    const contentChange = useCallback((e) => {
        _contentChange(e);
    },[]);

    const dateChange = useCallback((e) => {
        _dateChange(e);
    },[]);

    const titleChange = useCallback((e) => {
        _titleChange(e);
    },[]);

    const categoryChange = useCallback((e)=>{
        _categoryChange(e);
    },[]);

    useEffect(()=> {
        const isAdmin = getUserInfo(getUserInfoURL,accessToken);
        isAdmin
        .then((userType)=> {
            if(!userType){
                history.push('/admin/Login');
            }
        })
        .catch((errResponse)=> {
            errorTypeCheck(errResponse,refreshToken,actions,history);
        })
    },[])

    useEffect(()=> {
        getSubscribe(stomp,subscribeChange);
        if(stomp){
            return ()=> {
                if(isSubscribe){
                    stomp.unsubscribe();
                }
            }
        }
    },[stomp])

    useEffect(()=> {
        if(type === "Fix"){
            getHomework();
        }
    },[type])

    const getReparseDateObject = (date1,date2,date3,date4) => {
        const dateBuffer = {
            1: reparseDate(date1),
            2: reparseDate(date2),
            3: reparseDate(date3),
            4: reparseDate(date4),
        }
        return dateBuffer;
    }

    const isDataAllow = (title, content, type, date) => {
        if (title.length < 1) {
            return false;
        } else if (content.length < 1) {
            return false;
        } else if (type === -1) {
            return false;
        } else if (!isDateAllow(date)) {
            return false;
        }
        else {
            return true;
        }
    }

    const isFile = (obj) => {
        if (obj.type) {
            return true;
        } else {
            return false;
        }
    }
    

    const isAllFile = (array) => {
        let flag = true;
        array.map((e) => {
            isFile(e) ? flag = true : flag = false;
            return e;
        });
        return flag;
    }

    const isDateAllow = (date) => {
        const value = Object.values(date);
        let flag = true;
        value.map(e => {
            if (e.length < 10) {
                flag = false;
            }
            return e;
        })
        return flag;
    }

    const getHomework = () => {
        axios.get(`${homeworkURL}/${homeworkNum}`,header)
        .then((e)=> {
            const data = e.data;
            const { 
                file_info,
                homework_title, 
                homework_description, 
                homework_type, 
                homework_1_deadline, 
                homework_2_deadline, 
                homework_3_deadline, 
                homework_4_deadline 
            } = data;
            const dateBuffer = getReparseDateObject(homework_1_deadline, homework_2_deadline, homework_3_deadline, homework_4_deadline);
            fileChange(file_info);
            titleChange(homework_title);
            categoryChange(homework_type);
            contentChange(homework_description);
            dateChange(dateBuffer);
        })
        .catch((errResponse)=> {
            errorTypeCheck(errResponse,refreshToken,actions,history);
        });
    }

    const setData = () => {
        const data = new FormData();
        if(isAllFile(file)){
            file.map((e)=>{
                data.append('file[]',e);
                return e; 
            });
        }
        data.append("homework_title",title);
        data.append("homework_description",content);
        data.append("homework_type",category);
        data.append("homework_1_deadline",parseDate(date[1])/1000);
        data.append("homework_2_deadline",parseDate(date[2])/1000);
        data.append("homework_3_deadline",parseDate(date[3])/1000);
        data.append("homework_4_deadline",parseDate(date[4])/1000);

        return data;
    }

    const setHomework = () => {
        const data = setData();
        console.log(category);
        if(isDataAllow(title,content,category,date)){
            axios.post(homeworkURL,data,header)
            .then(()=> {
                history.push('/Admin');
            })
            .catch((errResponse)=> {
                errorTypeCheck(errResponse,refreshToken,actions,history);
            });
        } else {
            alert("요소들을 다시 한번 확인해 주세요.");
        }
    }  
    
    const patchHomework = () => {
        const data = setData();
        if(isDataAllow(title,content,type,date)){
            axios.patch(`${homeworkURL}/${homeworkNum}`,data,header)
            .then(()=> {
                history.push('/Admin')
            })
            .catch((errResponse)=>{
                errorTypeCheck(errResponse,refreshToken,actions,history);
            });
        } else {
            alert("요소들을 다시 한번 확인해 주세요.");
        }
    }

    const deleteHomework = () => {
        axios.delete(`${homeworkURL}/${homeworkNum}`,header)
        .then(()=> {
            history.push('/Admin');
        })
        .catch((errResponse)=> {
            errorTypeCheck(errResponse,refreshToken,actions,history);
        });
    }

    return (
        <BackgroundBlack>
            <Header 
                actions={actions} 
                state={state}
            />
            <S.HomeworkDiv>
                <h1>
                    {type === "Fix" ? "과제수정" : "과제생성"}
                </h1>
                <HomeworkButtonBar 
                    setHomework={setHomework} 
                    patchHomework={patchHomework}
                    deleteHomework={deleteHomework} 
                    type={type}
                />
                <div className="wrapper">
                    <HomeworkMain 
                        content={content}
                        title={title}
                        category={category}
                        categoryChange={categoryChange}
                        titleChange={titleChange}
                        contentChange={contentChange}
                    />
                    <HomeworkNav 
                        file={file}
                        date={date}
                        fileChange={fileChange}
                        dateChange={dateChange}
                    />
                </div>
            </S.HomeworkDiv>
        </BackgroundBlack>
    )
}

export default React.memo(
        withRouter(Admin_Homework)
    );