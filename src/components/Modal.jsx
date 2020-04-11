import React, { Component } from 'react';
import { Button, Modal as RModal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    const { customToggle } = this.props;

    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));

    if (customToggle) {
      customToggle();
    }
  };

  submitModal = async e => {
    const { onModalSubmit } = this.props;

    if (!onModalSubmit) {
      return;
    }

    const hasError = await onModalSubmit(e);

    if (!hasError) {
      this.toggle();
    }
  };

  onSuccess = async e => {
    const { onSuccess } = this.props;

    if (!onSuccess) {
      return;
    }

    const hasError = await onSuccess(e);

    if (!hasError) {
      this.toggle();
    }
  };

  render() {
    const {
      modalBody,
      modalTitle,
      successButtonTitle,
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
          outline={buttonOutline}
          onClick={this.toggle}
        >
          {buttonBody}
        </Button>
        <RModal isOpen={isOpen} toggle={this.toggle}>
          <Form onSubmit={e => this.submitModal(e)}>
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

Modal.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  modalBody: PropTypes.func.isRequired,
  buttonBody: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  customToggle: PropTypes.func,
  onModalSubmit: PropTypes.func,
  onSuccess: PropTypes.func,
  successButtonTitle: PropTypes.string,
  buttonClassName: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonOutline: PropTypes.bool,
};
