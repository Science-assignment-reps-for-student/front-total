import axios from 'axios';

export const refreshAccessToken = (refreshToken,actions,refreshAccessTokenURL)=> {
    const refreshHeader = {
        "headers": {
            "Authorization": refreshToken,
          },
    }
    // axios.put(refreshAccessTokenURL,{},refreshHeader)
    // .then((e)=> {
    //     const accessTokenBuffer = e.data.accessToken;
    //     const refreshTokenBuffer = e.data.refreshToken;
    //     setLocalStorage(accessTokenBuffer,refreshTokenBuffer);
    //     setContext(accessTokenBuffer,refreshTokenBuffer,actions);
    // })
}

export const setLocalStorage = (accessToken,refreshToken) => {
    localStorage.setItem('accessToken',accessToken);
    localStorage.setItem('refreshToken',refreshToken);
};
    
export const setContext = (accessToken,refreshToken,actions) => {
    const { accessTokenChange, refreshTokenChange } = actions;
    accessTokenChange(accessToken);
    refreshTokenChange(refreshToken);
}

export const parseDate = (date) => {
    return Date.parse(new Date(date));
}

export const reparseDate = (parsedDate) => {
    const bufferDate = new Date(parsedDate);
    const year = bufferDate.getFullYear().toString();
    let month = (bufferDate.getMonth()+1).toString();
    let day = bufferDate.getDate().toString();
    if(month.length < 2){
        month = `0${month}`;
    } 
    if(day.length < 2){
        day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
}

export const isDateAllow = (date) => {
    const value = Object.values(date);
    let flag = true;
    value.map(e => {
        if(e.length < 10){
            flag = false;
        }
        return e;
    })
    return flag;
}

export const isDataAllow = (title,content,type,date) => {
    if(title.length < 1){
        return false;
    } else if(content.length < 1){
        return false;
    } else if(type === -1){
        return false;
    } else if(!isDateAllow(date)){
        return false;
    }
     else {
        return true;
    }
}

export const isFile = (obj) => {
    if(obj.type){
        return true;
    } else {
        return false;
    }
}

export const isAllFile = (array) => {
    let flag = true;
    array.map((e)=>{
        isFile(e) ? flag = true : flag = false;
        return e;
    });
    return flag;
}

export const getUserInfo = (url,accessToken) => {
    const header = {
        headers: {
            "Authorization": accessToken,
        }
    }
    return new Promise((resolve,reject)=> {
        axios.get(url,header)
        .then((e)=> {
            const userType = e.data.userType;
            if(userType === 0){
                resolve(false);
            }
            resolve(true);
        })
        .catch((e)=> {
            reject(e);
        })
    })
}

export const getIsExpiration = (err) => {
    try{
        const statusCode = err.response.status;
        if(statusCode === 401 || statusCode === 410 || statusCode === 422){
            return true;
        } else{
            return false;
        }
    } catch {
    }
}

export const getAccessTokenUsingRefresh = (state, actions) => {
    // axios.put(state.limServer, {
    //     "headers": {
    //         "Authorization": state.refreshToken,
    //     },
    // }).then((e) => {
    //     localStorage.setItem("accessToken", e.data.accessToken);
    //     localStorage.setItem("refreshToken", e.data.refreshToken);
    //     actions.accessTokenChange(e.data.accessToken);
    //     actions.refreshTokenChange(e.data.refreshToken);
    // })
};