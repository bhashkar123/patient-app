import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';


const MyModal = (props) => {

    const handleClose = () => props.handleModalClose();
    const handleSubmit = () => props.handleModalSubmit(props.cat.id);
    //const handleShow = () => props.handleModalOpenClose(true);

    return (
        <Modal show={props.showModal} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.modalBody}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel Delete
            </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Delete
            </Button>
            </Modal.Footer>
        </Modal>

    );
}


export default MyModal;