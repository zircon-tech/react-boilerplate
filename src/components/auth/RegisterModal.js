import React, { useState } from 'react';
import { 
  Button, Modal, ModalHeader, ModalBody, ModalFooter 
} from 'reactstrap';
import PropTypes from 'prop-types';

const RegisterModal = (props) => {
  const {
    submitHandler, 
    className, 
    modal,
    setModal,
  } = props;


  const toggle = () => setModal(!modal);
  
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitHandler}>Send</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RegisterModal;