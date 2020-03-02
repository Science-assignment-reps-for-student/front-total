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
        Date.prototype.getDifferenceDate = (end, start) => {
            const date1 = new Date(start);
            const date2 = new Date(end);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        }
        const getHomework = () => {
            ApiDefault.get('homework', {
                headers: {
                    Authorization: state.accessToken
                }
            }).then(res => {
                if(res.data){
                    setHomework(res.data);
                } else {
                    history.push('/Admin');
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