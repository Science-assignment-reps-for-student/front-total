import React from 'react';
import New from '../img/New.png'

const BoardComponent = ({ title, writer, createDate, viewCount, comment, isNew }) => {
    return (
        <tr>
            {isNew ? <td><div><i/></div></td> : <td/>}
            <td>{writer}</td>
            <td>{title}</td>
            <td>{createDate}</td>
            <td>{viewCount}</td>
            <td>{comment}</td>
        </tr>
    )
}

export default BoardComponent;