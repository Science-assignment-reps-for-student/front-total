import React, { useState, useEffect } from 'react';
import { MyProfileBlock } from '../styles';
import ApiDefault from '../../utils';

const MyProfile = ({ state }) => {
    const [myInfo, setMyInfo] = useState(undefined);
    useEffect(() => {
        ApiDefault.get('user', {
            headers: {
                Authorization: state.accessToken
            }
        }).then(res => {
            setMyInfo(res.data);
        }).catch(_ => {
            setMyInfo(undefined)
        });
    }, [state]);
    return (
        myInfo !== undefined &&  
        <MyProfileBlock>
            <h3><pre>{String(myInfo.userNumber)[0]}학년 {String(myInfo.userNumber)[1]}반 {myInfo.userName}</pre></h3>
            <section>
                <article>
                    <span>남은과제</span>
                    <span>{myInfo.homeworkLeft}</span>
                </article>
                <article>
                    <span>제출한 과제</span>
                    <span>{myInfo.homeworkDone}</span>
                </article>
            </section>
        </MyProfileBlock>
    );
};

export default MyProfile;