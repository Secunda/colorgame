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
                    <NavItem onClick={props.newGame}>Start New Game</NavItem>

                    <NavDropdown title="Game Size" id="game-options">
                        <MenuItem onClick={() => props.switchSize(event, 5, 5)}>5x5</MenuItem>
                        <MenuItem onClick={() => props.switchSize(event, 10, 10)}>10x10</MenuItem>
                        <MenuItem onClick={() => props.switchSize(event, 15, 15)}>15x15</MenuItem>
                        <MenuItem onClick={() => props.switchSize(event, 20, 20)}>20x20</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );

    return navbarInstance;
}

export default Header
