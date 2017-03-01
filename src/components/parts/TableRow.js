import React from 'react'

import TableCell from './TableCell'

const TableRow = (props) => {
    return(
        <div className="row">
            { [...new Array(props.cols)].map((val, i) => {
                return <TableCell bg={props.row[i]} key={i} /> 
            }) }
        </div>
    )
}

export default TableRow