import axios from 'axios';
import { messageURL, refreshAccessTokenURL } from './serverURL';

export const refreshAccessToken = (refreshToken, actions) => {
    const refreshHeader = {
        "headers": {
            "Authorization": refreshToken,
        },
    }
    axios.put(refreshAccessTokenURL, {}, refreshHeader)
        .then((e) => {
            const accessTokenBuffer = e.data.accessToken;
            const refreshTokenBuffer = e.data.refreshToken;
            setLocalStorage(accessTokenBuffer, refreshTokenBuffer);
            setContext(accessTokenBuffer, refreshTokenBuffer, actions);
        })
}

export const setLocalStorage = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
};

export const setContext = (accessToken, refreshToken, actions) => {
    const { accessTokenChange, refreshTokenChange } = actions;
    accessTokenChange(accessToken);
    refreshTokenChange(refreshToken);
}

export const isDayOver = (date) => {
    const nowDate = new Date();
    const currentDate = new Date(date);
    const interval = nowDate - date;
    const milisecondToDay = Math.ceil(interval / (60 * 60 * 24 * 1000));
    const milisecondToHour = Math.ceil(interval / (60 * 60 * 1000));
    const milisecondTominutes = Math.ceil(interval / (60 * 1000));
    if(milisecondToDay > 1){
        return reparseDate(date)
    } else if(milisecondToHour > 1){
        const hour = currentDate.getHours();
        const minute = currentDate.getMinutes();
        const AMPM = hour > 12 ? "오후" : "오전";
        const AMPMHour = hour > 12 ? hour - 12 : hour;
        return `${AMPM} ${AMPMHour}:${minute}`;
    } else {
        return `${milisecondTominutes}분 전`;
    }
}   

export const parseDate = (date) => {
    return Date.parse(new Date(date));
}

export const reparseDate = (parsedDate) => {
    const bufferDate = new Date(parsedDate);
    const year = bufferDate.getFullYear().toString();
    let month = (bufferDate.getMonth() + 1).toString();
    let day = bufferDate.getDate().toString();
    if (month.length < 2) {
        month = `0${month}`;
    }
    if (day.length < 2) {
        day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
}

export const isDateAllow = (date) => {
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

export const isDataAllow = (title, content, type, date) => {
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

export const isFile = (obj) => {
    if (obj.type) {
        return true;
    } else {
        return false;
    }
}

export const isAllFile = (array) => {
    let flag = true;
    array.map((e) => {
        isFile(e) ? flag = true : flag = false;
        return e;
    });
    return flag;
}

export const getUserInfo = (url, accessToken) => {
    const header = {
        headers: {
            "Authorization": accessToken,
        }
    }
    return new Promise((resolve, reject) => {
        axios.get(url, header)
        .then((e) => {
            const userType = e.data.userType;
            if (userType === 0) {
                resolve(false);
            }
            resolve(true);
        })
        .catch((e) => {
            reject(e);
        })
    })
}

export const getIsExpiration = (err) => {
    try {
        const statusCode = err.response.status;
        console.log(statusCode);
        if (statusCode === 401 || statusCode === 410 || statusCode === 422) {
            return true;
        } else {
            return false;
        }
    } catch {
    }
}

export const getAccessTokenUsingRefresh = (state, actions) => {
    axios.put(state.limServer, {
        "headers": {
            "Authorization": state.refreshToken,
        },
    }).then((e) => {
        localStorage.setItem("accessToken", e.data.accessToken);
        localStorage.setItem("refreshToken", e.data.refreshToken);
        actions.accessTokenChange(e.data.accessToken);
        actions.refreshTokenChange(e.data.refreshToken);
    })
};


export const getHasAlarm = (header) => 
new Promise((resolve,reject) => {
    axios.get(messageURL,header)
    .then((e)=> { 
        const messageData = e.data;
        const firstMessage = messageData[0];
        if(firstMessage.show){
            resolve(false);
        } else {
            resolve(true);
        }
    })
    .catch((e)=> {
        reject(e);
    })
});

export const getSubscribe = (stomp,subscribeChange) => {
    if(stomp){
        try {
            setSubscribe(stomp);
            subscribeChange(true);
        } catch {
            stomp.onConnect = () => {
                setSubscribe(stomp);
                subscribeChange(true);
            }
        }
    }
}

const setSubscribe = (stomp) => {
    stomp.subscribe('/receive', (e)=> {
        console.log(e);
    })
}

const setNotification = (data) => {
    const notificate = new Notification();
}

export const errorTypeCheck = (e,refreshToken,actions) => {
    getIsExpiration(e) 
    ? refreshAccessToken(refreshToken,actions) 
    : alert("네트워크를 확인해 주세요.");
}

export const refreshCallback = (refreshToken,actions,error,callback) => {
    if(getIsExpiration(error)){
        refreshAccessToken(refreshToken,actions)
        .then(()=> {
            callback();
        });
    } else {
        alert("네트워크를 확인해 주세요.");
    }
}