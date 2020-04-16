import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { HomeWorkListWrapper } from '../styles';
import HomeWorkItem from './HomeWorkItem';
import ApiDefault from '../../utils';

const HomeWorkList = ({ state, homework, setHomework, taskState, setHomeworkDataInState }) => {
    const history = useHistory();

    useEffect(() => {
        Date.prototype.yyyymmddWithDot = function() {
            var mm = this.getMonth() + 1;
            var dd = this.getDate();
            return [
                this.getFullYear(),
                (mm > 9 ? '' : '0') + mm,
                (dd > 9 ? '' : '0') + dd
            ].join('.');
        };          
        Date.prototype.getDDay = (end) => {
            let date1 = new Date(end);
            let date2 = new Date(Date.now());
            date1 = new Date(date1.getFullYear(), date1.getMonth()+1, date1.getDate());
            date2 = new Date(date2.getFullYear(), date2.getMonth()+1, date2.getDate());
            const diffTime = date1 - date2;
            const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
            return diffDays >= 0 ? diffDays === 0 ? 'D-Day' : `D-${diffDays}` : '마감됨';
        }
        const getHomework = () => {
            ApiDefault.get('homework', {
                headers: {
                    Authorization: state.accessToken
                }
            }).then(res => {
                if(res.data){
                    setHomework(res.data);
                }
            })
        };
        getHomework();
    }, []);

    return (
        <HomeWorkListWrapper>
            {homework.map(data => <HomeWorkItem key={data.id} data={data} taskState={taskState} setHomeworkDataInState={setHomeworkDataInState} />)}
        </HomeWorkListWrapper>
    );
};

export default HomeWorkList;