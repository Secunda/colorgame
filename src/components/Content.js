import React from 'react'

import Table from './parts/Table'

const Content = (props) => {
    const cols = 20;
    const rows = 20;

    return(
        <div className="container text-center">
            <Table cols={cols} rows={rows} listOfChoosers={props.listOfChoosers} />
        </div>
    )
}

export default Content