import React from 'react'

import { Nav, NavItem, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';

const Header = (props) => {
    const navbarInstance = (
        <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">ColorGame</a>
                </Navbar.Brand>

                <Navbar.Text>
                    <b>Score</b> {props.score} | <b>Step</b> {props.step}
                </Navbar.Text>
                
                <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1} href="#" onClick={props.newGame}>Start New Game</NavItem>

                    <NavDropdown title="Options" id="game-options">
                        <MenuItem>10x10</MenuItem>
                        <MenuItem>15x15</MenuItem>
                        <MenuItem>20x20</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );

    return navbarInstance;
}

export default Header
