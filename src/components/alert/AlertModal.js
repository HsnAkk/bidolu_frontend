import React from 'react';
import { Modal } from 'react-bootstrap';


function AlertModal ({ show, onHide, heading, text }) {


    return (
      <div>
        <Modal show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title className="text-danger">{heading}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-danger my-3">{text}</Modal.Body>
        </Modal>
      </div>
    );
  }
  
  export default AlertModal