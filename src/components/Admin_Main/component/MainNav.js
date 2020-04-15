import React, { useCallback } from 'react';
import * as S from '../style/MainStyle';


const MainNav = ({ 
    checked, 
    checkedChange, 
    typeChange, 
    type 
}) => {
    
    const isAllChecked = useCallback(
        () => {
        const checkedValue = Object.values(checked);
        return checkedValue.find((e) => e !== false);
    },[checked])

    const allCheck = useCallback(
        (e) => {
        const keys = Object.keys(checked);
        let buffer = Object.assign({},checked);
        keys.map((num)=>{
            buffer[num] = e.target.checked;
        });
        checkedChange(buffer);
    },[checked, checkedChange])

    const handleClick = useCallback(
    (classNumber) => {
        let buffer = Object.assign({},checked);
        buffer[`class_${classNumber}`] = !buffer[`class_${classNumber}`];
        checkedChange(buffer);
    },[checked, checkedChange])

    const homeworkHandleClick = useCallback(
        (homeworkType) => {
        let buffer = Object.assign({},type);
        buffer[homeworkType] = !buffer[homeworkType];
        typeChange(buffer);
    },[type, typeChange])

    return ( 
        <S.MainNav>
            <div id="bar"/>
            <h2>필터</h2>
            <div id="bar"/>
            <S.MainClassCheckbox>
                <input 
                    type="checkbox" 
                    checked={isAllChecked()} 
                    onChange={allCheck}
                />
                <span>전체</span>
            </S.MainClassCheckbox>
            <div id="bar"/>
            <S.MainClassCheckbox>
                <input 
                    type="checkbox" 
                    checked={checked.class_1} 
                    onChange={() => handleClick(1)}
                />
                <span>1반</span>
            </S.MainClassCheckbox>
            <S.MainClassCheckbox>
                <input 
                    type="checkbox" 
                    checked={checked.class_2} 
                    onChange={() => handleClick(2)}
                />
                <span>2반</span>
            </S.MainClassCheckbox>
            <S.MainClassCheckbox>
                <input 
                    type="checkbox" 
                    checked={checked.class_3} 
                    onChange={() => handleClick(3)}
                />
                <span>3반</span>
            </S.MainClassCheckbox>
            <S.MainClassCheckbox>
                <input 
                    type="checkbox" 
                    checked={checked.class_4} 
                    onChange={() => handleClick(4)}
                />
                <span>4반</span>
            </S.MainClassCheckbox>
            <div id="bar"/>
            <S.MainClassCheckbox>
                <input 
                    type="checkbox" 
                    checked={type.personal}  
                    onChange={()=> homeworkHandleClick("personal")}
                />
                <span>개인 과제</span>
            </S.MainClassCheckbox>
            <S.MainClassCheckbox>
                <input 
                    type="checkbox" 
                    checked={type.team} 
                    onChange={()=> homeworkHandleClick("team")}
                />
                <span>팀 과제</span>
            </S.MainClassCheckbox>
            <S.MainClassCheckbox>
                <input 
                    type="checkbox" 
                    checked={type.experiment} 
                    onChange={()=> homeworkHandleClick("experiment")}
                />
                <span>실험 과제</span>
            </S.MainClassCheckbox>
            <div id="bar"/>
        </S.MainNav>
    )
}

export default MainNav;