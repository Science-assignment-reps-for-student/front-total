import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import * as S from '../style/PublicStyle'

const HeaderButton = ({ children, page, history, actions, isCheck }) => {

    const [isHover,hoverChange] = useState(false);
    const { refreshTokenChange, accessTokenChange } = actions;

    const pages = {
        main: () => { history.push('/Admin') },
        make: () => { history.push('/Admin/Make') },
        qna: () => { history.push('/Admin/ChattingList') },
        revise: () => { history.push('/Admin/revise') },
        logout: () => { 
            refreshTokenChange("");
            accessTokenChange("");
            localStorage.clear();
            history.push('/Admin/Login');
        }
    }
    
    const mouseEnter = () => {
        hoverChange(true);
    }

    const mouseLeave = () => {
        hoverChange(false);
    }

    const movePage = () => {
        pages[page]();  
    }

    return (
        <S.HeaderButton onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={movePage}>
            <p>{children}</p>
            <S.HeaderButtonUnderLine hover={isHover}/>
            {isCheck ? <div className="check"/> : ""}
        </S.HeaderButton>
    )
}

export default withRouter(HeaderButton);
