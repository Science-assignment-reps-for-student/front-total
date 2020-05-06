import React, { useState, useEffect } from 'react';
import * as S from '../style/BoardDetailStyle';

const BoardTop = ({ 
    title, 
    description, 
    name, 
    created_at,
    fixClickHandler,
    deleteClickHandler,
    board_id,
    imgs = [],
}) => {
    return (
        <S.TaskTop className="task-top">
            <div className="task-header">
                <div>
                    <h1>{title}</h1>
                </div>
                <nav>
                    <ul>
                        <li>{name}</li>
                        <li><span>{created_at}</span></li>
                        <li onClick={()=> fixClickHandler(board_id)}>수정</li>
                        <li onClick={()=> deleteClickHandler(board_id)}>삭제</li>
                    </ul>
                </nav>
            </div>
            <div className="task-desc">
                <div className="desc">
                    <p>{description}</p>
                    <div>
                        {
                            imgs.map((id)=> {
                                return (
                                    <S.BoardInputImg>
                                        <img 
                                            src={`https://api.dsm-scarfs.hs.kr/t-bone/image/${id}`} 
                                            alt=""
                                            onClick={()=> {window.open(`https://api.dsm-scarfs.hs.kr/t-bone/image/${id}`)}}
                                        />
                                    </S.BoardInputImg>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </S.TaskTop>
    )
}

export default BoardTop;