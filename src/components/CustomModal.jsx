import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';

export default class CustomModal extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    const { customToggle } = this.props;
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));

    customToggle();
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
        <Button className={buttonClassName} color={buttonColor} onClick={() => this.toggle()}>
          {buttonBody}
        </Button>
        <Modal isOpen={isOpen} toggle={this.toggle}>
          <Form onSubmit={e => onModalSubmit(e)}>
            <ModalHeader toggle={this.toggle}>{modalTitle}</ModalHeader>
            <ModalBody>{modalBody()}</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle} type="submit">
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
