import React from 'react'

import { Modal, Button } from 'react-bootstrap';

const FinishedPopup = (props) => {
    return(
        <Modal show={props.finished} onHide={props.closeFinishedModal}>
          <Modal.Header closeButton>
            <Modal.Title>The game is over</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4 className='text-center'>Your score: <b>{props.score}</b></h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.closeFinishedModal}>New Game</Button>
          </Modal.Footer>
        </Modal>
    )
}

export default FinishedPopup