import React, { useCallback } from 'react';
import * as S from '../style/HomeworkStyle';
import  { fileImg }  from '../imgs';
import { HomeworkFileContent } from '../component';

const HomeworkFile = ({ 
    file,
    fileChange 
}) => {

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

    const deleteFile = useCallback((fileArray,name)=> {
        const buffer = fileArray.filter((file)=> file.name !== name && file.file_name !== name);
        fileChange(buffer);
    },[fileChange])

    const inputChange = useCallback((e) => {
        const fileBuffer = e.target.files;
        const fileLength = fileBuffer.length;
        let buffer = setBuffer(fileBuffer,fileLength);
        fileChange(buffer);
    },[fileChange,setBuffer])
    
    const setFileComponent = useCallback((file) => {
        console.log("setFile")
        const buffer = file.map((e)=>{
            return <HomeworkFileContent 
                deleteFile={deleteFile}
                file={file}
            >
                { e.name || e.file_name }
            </HomeworkFileContent>
        })
        return buffer;
    },[deleteFile])

    return (
        <>
            <S.HomeworkFile>
                <label>
                    {
                        file.length > 0 ? 
                        setFileComponent(file) :
                        <div>
                            <img src={fileImg} alt="file"/>
                            첨부파일
                        </div>
                    }
                    <input multiple onChange={inputChange} type="file"/>
                </label>
            </S.HomeworkFile>
        </>
    )
}

export default React.memo(HomeworkFile);