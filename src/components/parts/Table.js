import React from 'react'

import TableRow from './TableRow'

const Table = (props) => {
    return(
        <div className='game-container'>
            { [...new Array(props.rows)].map((val, i) => {
                    if (typeof props.matrix[i] !== "undefined") {
                        return <TableRow cols={props.cols} row={props.matrix[i]} key={i} /> 
                    }
                    return "";
                })
            }
        </div>
    )
}

export default Table
