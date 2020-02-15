import React from 'react'
import * as S from '../style/PublicStyle'
import background from '../imgs/background.png'

const BackgroundBlack = ({children}) => {
    return (
        <>
            <S.Background src={background}>
                {children}
            </S.Background>
        </>
    )
}

export default BackgroundBlack;