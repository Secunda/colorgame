import React from 'react'

import TableRow from './TableRow'

const Table = (props) => {
    return(
        <div>
            { [...new Array(props.rows)].map((val, i) => 
                { return <TableRow cols={props.cols} row={props.matrix[i]} key={i} /> }) }
        </div>
    )
}

export default Table
