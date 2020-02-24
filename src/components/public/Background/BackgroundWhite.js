import React from 'react';
import * as S from '../style/PublicStyle';
import { backgroundWhite } from '../imgs'

const BackgroundWhite = ({ children, img }) => {
    return (
        <S.BackgroundWhite src={img ? backgroundWhite : ""}>
            {children}
        </S.BackgroundWhite>
    )
}

export default BackgroundWhite;