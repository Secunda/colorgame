import React from 'react'

const FooterChooser = (props) => {
    return(
        <a href="#" onClick={(event) => props.nextStep(event, props.bg)} className={'btn chooser  ' + props.bg}></a>
    )
}

export default FooterChooser