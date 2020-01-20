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
      <Modal {...props}>
        <ModalHeader
          className="justify-content-center"
          toggle={doClose}
          onClosed={cleanModalForm}
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
