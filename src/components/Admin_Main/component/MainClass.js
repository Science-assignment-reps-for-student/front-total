import React, { useCallback } from 'react';
import * as S from '../style/MainStyle';
import { MainList } from '../component';
import { AccessTokenConsumer } from '../../../context/AccessTokenContext';
import { reparseDate } from '../../resource/publicFunction';
import { importantIcon } from '../imgs';

const MainClass = ({ 
    num, 
    title, 
    studentList, 
    deadline, 
    contentId, 
    created_at 
}) => {

    const countChecked = useCallback(
    (studentList) => {
        let counter = 0;
        if(Array.isArray(studentList)){
            studentList.map((e)=>{
                if(e.submit){
                    counter++;
                }
                return e;
            })
        }
        return counter;
    },[])
    
    const isHomeworkOver = useCallback(
    (deadline) => {
        const nowDate = new Date();
        const currentDate = new Date(deadline * 1000);
        return nowDate > currentDate;
    },[])
    
    const max = studentList.length;
    const count = countChecked(studentList);


    return (
        <div>
            <h2>{num}반</h2>
            <S.MainClass isOver={isHomeworkOver(deadline)}>
                <h3>
                    <div>
                        {
                            isHomeworkOver(deadline) ? <img src={importantIcon} alt=""/> : ""
                        }
                        {title}
                    </div>
                    <span>시작: {reparseDate(created_at*1000)} 종료 : {reparseDate(deadline*1000)}</span>
                </h3>
                <hr/>
                <div>
                    <S.MainClassCount>
                        <div>
                            <p>제출인원  <span>{count}</span>/{max}</p>
                            <S.MainClassCountBar>
                                <S.MainClassCoutColoredBar max={max} count={count}/>
                            </S.MainClassCountBar>
                        </div>
                    </S.MainClassCount>
                    <div className="secondDiv">
                        <AccessTokenConsumer>
                            {
                                ({ state, actions }) => {
                                    return <MainList type={0} contentId={contentId} studentList={studentList} state={state} actions={actions}/>
                                }
                            }
                        </AccessTokenConsumer>
                    </div>
                </div>
            </S.MainClass>
        </div>
    )
}

export default MainClass;