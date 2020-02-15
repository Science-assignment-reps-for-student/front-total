import React from 'react'

const HomeworkFileContent = ({children}) => {
    return (
        <p>{children}</p>
    )
}

export default React.memo(HomeworkFileContent);