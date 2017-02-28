import React from 'react'

import TableCell from './TableCell'

const TableRow = (props) => {
    return(
        <div className="row">
            { [...new Array(props.cols)].map((val, i) => {
                let randomIndex = Math.floor(Math.random() * props.listOfChoosers.length),
                    bg = props.listOfChoosers[randomIndex];

                return <TableCell bg={bg} key={i} /> 
            }) }
        </div>
    )
}

export default TableRow