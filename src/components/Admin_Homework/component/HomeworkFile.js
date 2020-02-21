import React, { useCallback } from 'react';
import * as S from '../style/HomeworkStyle';
import  { fileImg }  from '../imgs';
import { HomeworkFileContent } from '../component';

const HomeworkFile = ({ file,fileChange }) => {

    const setBuffer = useCallback((fileBuffer,fileLength) => {
        let buffer = [];
        if(Array.isArray(file)){
            buffer = [...file];
        }
        for(let i = 0;i < fileLength; i++){
            buffer.push(fileBuffer[i])   
        }
        return buffer;
    },[file])

    const inputChange = useCallback((e) => {
        const fileBuffer = e.target.files;
        const fileLength = fileBuffer.length;
        let buffer = setBuffer(fileBuffer,fileLength);
        fileChange(buffer);
    },[fileChange,setBuffer])
    

    const buttonClickHandler = useCallback(() => {
        fileChange([]);
    },[fileChange])

    const deleteButtonClickHandler = useCallback(() => {
        fileChange([]);
    },[fileChange])

    return (
        <>
            <S.HomeworkFile>
                    {
                        file.length ? 
                        file.map((e)=>{
                            return <HomeworkFileContent>
                                { e.file_name ? e.file_name : e.name }
                            </HomeworkFileContent>
                        }) : 
                        <div>
                            <img src={fileImg} alt="file"/>
                            첨부파일
                        </div>
                    }
            </S.HomeworkFile>
            <S.HomeworkFileLabel>
                <label>
                    <div onClick={buttonClickHandler}>파일 수정</div>
                    <input multiple onChange={inputChange} type="file"/>
                </label>
                <div onClick={deleteButtonClickHandler}>파일 삭제</div>
            </S.HomeworkFileLabel>
        </>
    )
}

export default React.memo(HomeworkFile);