import React from 'react'

const FooterChooser = (props) => {
    return(
        <a href="#" onClick={props.nextStep} className={'btn chooser  ' + props.bg}></a>
    )
}

export default FooterChooser