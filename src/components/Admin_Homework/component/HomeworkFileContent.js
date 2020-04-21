import React from 'react'

const HomeworkFileContent = ({
    children,
    deleteFile,
    file,
}) => {
    const deleteClickHandler = (event) => {
        event.preventDefault();
        deleteFile(file,children);
    }
    return (
        <p key={children}>
            <div>
                {children}
                <span onClick={deleteClickHandler}>
                    ❌
                </span>
            </div>
        </p>
    )
}

export default React.memo(HomeworkFileContent);