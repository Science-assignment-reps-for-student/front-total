import React from 'react';
import {
    FixingBody,
    FixingTitle,
} from './style';

const Fixing = () => {
    return (
        <FixingBody>
            <div>
                <FixingTitle className="img">🔧점검중🔧</FixingTitle>
                <FixingTitle>사용에 불편을 드려 죄송합니다.</FixingTitle>
            </div>
        </FixingBody>
    )
}

export default Fixing;