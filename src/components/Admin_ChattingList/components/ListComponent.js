import React from 'react'

const ListComponent = ({ number, text, name, date, isNew }) => {
    return (
        <tr>
            <td className="new">
                {isNew ? <div className="new"></div> : ""}
            </td>
            <td>{number}</td>
            <td>{name}</td>
            <td>{text}</td>
            <td>{date}</td>
        </tr>
    )
}

export default ListComponent;