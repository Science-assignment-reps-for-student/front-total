import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import * as Styled from './styled';
import SCARF from './img/SCARFS.png';

const Header = () => {
    const activeStyle = {
        color: "#FF5700",
    };
    return (
        <Styled.TaskHaeder>
            <div>
                <Link to="/">
                    <img src={SCARF} alt="logo" />
                </Link>
            </div>
            <div>
                <ul>
                    <li>
                        <NavLink to="/task" activeStyle={activeStyle}>과제 안내</NavLink>
                    </li>
                    <li>
                        <NavLink to="/qna" activeStyle={activeStyle}>QnA</NavLink>
                    </li>
                    <li>
                        <NavLink to="/board" activeStyle={activeStyle}>게시판</NavLink>
                    </li>
                </ul>
            </div>
        </Styled.TaskHaeder>
    )
}

export default Header;