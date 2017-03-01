import React from 'react'

import Table from './parts/Table'

const Content = (props) => {
    return(
        <div className="container text-center">
            <Table cols={props.cols} rows={props.rows} matrix={props.matrix} />
        </div>
    )
}

export default Content