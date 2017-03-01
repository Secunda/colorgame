import React from 'react'

const Header = (props) => {
    return(
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">Color Game</a>
                </div>
                <div id="navbar" className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="#" onClick={props.newGame}>Start New Game</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header