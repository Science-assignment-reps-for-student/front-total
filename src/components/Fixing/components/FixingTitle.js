import React from 'react';
import * as Styled from '../style/index';

const FixingTitle = ({ fontSize, children }) => {
    return (
        <Styled.FixingTitle fontSize={fontSize}>{children}</Styled.FixingTitle>
    )
}

export default FixingTitle;