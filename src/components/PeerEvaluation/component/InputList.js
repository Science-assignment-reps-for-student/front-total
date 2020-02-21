import React from 'react';
import * as Styled from '../Styled';

const InputList = ({ type, title, subTitle, i, selfReducerHandler, peerStateChange }) => {
    const list = (
        <Styled.InputList>
            <div>
                <h5>{title}</h5>
                <pre>{subTitle}</pre>
            </div>
            <div>
                <input 
                    type="radio" 
                    data-score={3} 
                    data-type={type} 
                    data-num={i}
                    onClick={(e) => {
                        console.log(typeof selfReducerHandler, typeof peerStateChange);
                        if (typeof selfReducerHandler === "function")
                            selfReducerHandler(e);
                        else if (typeof peerStateChange === "function")
                            peerStateChange(e);
                        else return;
                    }} 
                    name={`${type}-radio-${i}`} 
                />
                <input 
                    type="radio" 
                    data-score={2} 
                    data-type={type} 
                    data-num={i}
                    onClick={(e) => {
                        if (typeof selfReducerHandler === "function")
                            selfReducerHandler(e);
                        else if (typeof peerStateChange === "function")
                            peerStateChange(e);
                        else return;
                    }}
                    name={`${type}-radio-${i}`} 
                />
                <input 
                    type="radio" 
                    data-score={1} 
                    data-type={type} 
                    data-num={i}
                    onClick={(e) => {
                        if (typeof selfReducerHandler === "function")
                            selfReducerHandler(e);
                        else if (typeof peerStateChange === "function")
                            peerStateChange(e);
                        else return;
                    }}
                    name={`${type}-radio-${i}`} 
                />
            </div>
        </Styled.InputList>
    )
    return list;
};

export default InputList;