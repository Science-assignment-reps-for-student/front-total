import React from 'react';

const BoardComponent = ({ title, writer, createDate, onClick }) => {
    return (
        <tr onClick={onClick}>
            <td>{writer}</td>
            <td>{title}</td>
            <td>{createDate}</td>
        </tr>
    )
}

export default BoardComponent;