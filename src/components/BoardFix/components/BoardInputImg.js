import React from 'react';
import * as S from '../style/BoardInputStyle';
const BoardInputImg = ({ imgs , imgChange, index }) => {
    const img = imgs[index];
    let url = "";
    if(typeof img === "number"){
        url = `https://api.dsm-scarfs.hs.kr/t-bone/image/${img}`;
    } else {
        url = URL.createObjectURL(img);
    }
    const deleteButtonClickHandler = () => {
        const buffer = [...imgs];
        buffer.splice(index,1);
        imgChange(buffer);
    }
    return (
        <S.BoardInputImg>
            <img src={url} alt="이미지"/>
            <div onClick={deleteButtonClickHandler}>
                <div className="mdiv">
                    <div className="md"/>
                </div>
            </div>
        </S.BoardInputImg>
    )
}

export default BoardInputImg;