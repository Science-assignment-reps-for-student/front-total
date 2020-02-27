import React from 'react';
import { isDayOver } from '../../resource/publicFunction';
import * as S from '../style/ChattingStyle';

const ChattingBubble = ({ messageType, count, message, userData, messageTime }) => {
    return (
        <S.ChattingTalk type={messageType} key={count}>
            <div>
                {messageType ? "" : userData.userName}
                <S.ChattingBubble type={messageType}>{message}</S.ChattingBubble>
                <span>{isDayOver(messageTime)}</span>
            </div>
        </S.ChattingTalk>
    )
}

export default ChattingBubble;