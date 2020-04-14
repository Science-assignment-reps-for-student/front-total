import React, { useState, useCallback, useEffect } from 'react';
import * as S from '../style/HomeworkStyle';

const HomeworkTitle = ({ 
    category,
    title,
    categoryChange,
    titleChange,
 }) => {

    const [isHover,hoverChange] = useState();
    const [categoryView,categoryViewChange] = useState("선택");

    const mouseOver = useCallback(() => {
        hoverChange(true);
    },[])

    const mouseLeave = useCallback(() => {
        hoverChange(false);
    },[])

    const inputChange = useCallback((e) => {
        titleChange(e.target.value)
    },[titleChange]);

    const categoryClick = useCallback((e) => {
        const text = e.target.innerText;
        const code = getCode(text);
        categoryChange(code);
    },[categoryChange]);

    const getCode = (text) => {
        if(text === "개인 과제"){
            return 0;
        } else if(text === "팀 과제"){
            return 1;
        } else if(text === "실험 과제") {
            return 2;
        } else {
            return -1;
        }
    }

    const getText = (code) => {
        if(code === 0){
            categoryViewChange("개인 과제");
        } else if(code === 1){
            categoryViewChange("팀 과제");
        } else if(code === 2) {
            categoryViewChange("실험 과제");
        } else {
            categoryViewChange("카테고리");
        }
    }

    useEffect(()=> {
        getText(category);
    },[category])

    return (
        <>
            <S.HomeworkTitle>
                <S.HomeworkDropdown 
                    onMouseEnter={mouseOver} 
                    onMouseLeave={mouseLeave}
                >
                    <p>
                        {categoryView}
                    </p>
                    <i/>
                </S.HomeworkDropdown>
                <S.HomeworkTitleInput 
                    onChange={inputChange} 
                    placeholder="제목" 
                    value={title}
                />
            </S.HomeworkTitle>

            <S.HomeworkDropdownContentWrapper 
                onMouseEnter={mouseOver} 
                onMouseLeave={mouseLeave} 
                hover={isHover}
            >
                <S.HomeworkDropdownContent 
                    onClick={categoryClick} 
                    value="0"
                >
                    개인 과제
                </S.HomeworkDropdownContent>
                <S.HomeworkDropdownContent 
                    onClick={categoryClick} 
                    value="1"
                >
                    팀 과제
                </S.HomeworkDropdownContent>
                <S.HomeworkDropdownContent 
                    onClick={categoryClick} 
                    value="2"
                >
                    실험 과제
                </S.HomeworkDropdownContent>
            </S.HomeworkDropdownContentWrapper>
        </>
    )
}

export default React.memo(HomeworkTitle);