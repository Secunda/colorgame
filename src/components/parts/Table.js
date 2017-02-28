import React from 'react'

import TableRow from './TableRow'

const Table = (props) => {
    return(
        <div>
            { [...new Array(props.rows)].map((val, i) => 
                { return <TableRow cols={props.cols} listOfChoosers={props.listOfChoosers} key={i} /> }) }
        </div>
    )
}

export default Table
