import React from 'react'

import { Nav, NavItem, Navbar } from 'react-bootstrap';

const Header = (props) => {
    const navbarInstance = (
        <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">ColorGame</a>
                </Navbar.Brand>
                
                <Navbar.Toggle />

                <Navbar.Text>
                    <b>Score</b> {props.score} | <b>Step</b> {props.step}
                </Navbar.Text>
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1} href="#" onClick={props.newGame}>Start New Game</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );

    return navbarInstance;
}

export default Header
