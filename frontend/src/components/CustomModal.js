import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CustomModal = ({
  show,
  handleClose,
  content,
  title,
  handleDeleteConfirm,
}) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDeleteConfirm}>
          Confirm Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
