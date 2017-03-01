import React from 'react'

import FooterChooser from './parts/FooterChooser'

const Footer = (props) => {
    return(
        <footer className="footer">
            <div className="container text-center">
                <div className="btn-group text-center" role="group">
                    { props.listOfChoosers.map((cl, i) => { return <FooterChooser nextStep={props.nextStep} bg={cl} key={i} /> }) }
                </div>
            </div>
        </footer>
    )
}

export default Footer