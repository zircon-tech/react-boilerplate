import React, { Component } from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

export default class GenericModal extends Component {
  render() {
    const {
      props,
      headerText,
      body,
      footer,
      doClose,
      cleanModalForm,
    } = this.props;
    return (
      <Modal 
        {...props} 
        toggle={doClose} 
        onClosed={cleanModalForm}
      >
        <ModalHeader
          className="justify-content-center"
        >
          <span>
            {headerText}
          </span>
        </ModalHeader>
        <ModalBody>
          <div className="modal-body">
            {body}
          </div>
        </ModalBody>
        { footer && (
          <ModalFooter className="justify-content-center">
            {footer}
          </ModalFooter>
        )}
      </Modal>
    );
  }
}
