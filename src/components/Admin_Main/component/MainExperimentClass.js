import React, { useCallback } from 'react';
import * as S from '../style/MainStyle';
import { MainList } from '../component';
import { AccessTokenConsumer } from '../../../context/AccessTokenContext';
import { reparseDate } from '../../resource/publicFunction';

const MainExperimentClass = ({ num, title, studentList, teamList, contentId, deadline, created_at }) => {

    const countChecked = (studentList) => {
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
    }

    
    const max = studentList.length;
    const count = countChecked(studentList);

    const teamMax = teamList.length;
    const teamCount = countChecked(teamList);


    return (
        <div>
            <h2>{num}반</h2>
            <S.MainClass>
                <h3>{title}<span>시작: {reparseDate(created_at*1000)} 종료 : {reparseDate(deadline*1000)}</span></h3>
                <hr/>
                <div>
                    <S.MainClassCount>
                        <div>
                            <p>제출팀  <span>{teamCount}</span>/{teamMax}</p>
                            <S.MainClassCountBar>
                                <S.MainClassCoutColoredBar max={teamMax} count={teamCount}/>
                            </S.MainClassCountBar>
                            <p>제출인원  <span>{count}</span>/{max}</p>
                            <S.MainClassCountBar>
                                <S.MainClassCoutColoredBar max={max} count={count}/>
                            </S.MainClassCountBar>
                        </div>
                        <div>
                            <AccessTokenConsumer>
                                {
                                    ({ state, actions}) => {
                                        return <MainList 
                                        state={state} 
                                        actions={actions} 
                                        studentList={teamList} 
                                        text="개인 과제"
                                        contentId={contentId}
                                        />
                                    }
                                }
                            </AccessTokenConsumer>
                        </div>
                    </S.MainClassCount>
                    <div className="secondDiv">
                        <AccessTokenConsumer>
                                {
                                    ({ state }) => {
                                        return <MainList studentList={studentList} state={state} text="상호평가"/>
                                    }
                                }   
                        </AccessTokenConsumer>
                    </div>
                </div>
            </S.MainClass>
        </div>
    )
}

export default MainExperimentClass;