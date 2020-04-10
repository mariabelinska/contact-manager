import React, { Component } from 'react';
import { Button, Modal as RModal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';

export default class Modal extends Component {
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

    if (onSuccess) {
      onSuccess(e);
    }

    this.toggle();
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
      buttonOutline,
    } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        <Button
          className={buttonClassName}
          color={buttonColor ? buttonColor : 'primary'}
          outline={buttonOutline ? true : false}
          onClick={this.openModal}
        >
          {buttonBody}
        </Button>
        <RModal isOpen={isOpen} toggle={this.toggle}>
          <Form onSubmit={e => onModalSubmit(e)}>
            <ModalHeader toggle={this.toggle}>{modalTitle}</ModalHeader>
            <ModalBody>{modalBody()}</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={e => this.onSuccess(e)} type="submit">
                {successButtonTitle ? successButtonTitle : 'Save'}
              </Button>
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </RModal>
      </>
    );
  }
}
