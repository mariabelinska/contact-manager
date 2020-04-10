import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';

export default class CustomModal extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  openModal = () => {
    const { onModalOpen } = this.props;

    this.toggle();

    if (onModalOpen) {
      onModalOpen();
    }
  };

  onSuccess = e => {
    const { onSuccess } = this.props;

    this.toggle();

    if (onSuccess) {
      onSuccess(e);
    }
  };

  render() {
    const {
      modalBody,
      modalTitle,
      successButtonTitle,
      onModalSubmit,
      buttonClassName,
      buttonColor,
      buttonBody,
    } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        <Button className={buttonClassName} color={buttonColor} onClick={this.openModal}>
          {buttonBody}
        </Button>
        <Modal isOpen={isOpen} toggle={this.toggle}>
          <Form onSubmit={e => onModalSubmit(e)}>
            <ModalHeader toggle={this.toggle}>{modalTitle}</ModalHeader>
            <ModalBody>{modalBody()}</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={e => this.onSuccess(e)} type="submit">
                {successButtonTitle ? successButtonTitle : 'Confirm'}
              </Button>
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </>
    );
  }
}
