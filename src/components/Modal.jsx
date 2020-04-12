import React, { useState } from 'react';
import { Button, Modal as RModal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import PropTypes from 'prop-types';

const Modal = ({
  modalBody,
  modalTitle,
  successButtonTitle,
  buttonClassName,
  buttonColor,
  buttonBody,
  buttonOutline,
  onModalSubmit,
  customToggle,
  onSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);

    if (customToggle) {
      customToggle();
    }
  };

  const submitModal = async e => {
    if (!onModalSubmit) {
      return;
    }

    const hasError = await onModalSubmit(e);

    if (!hasError) {
      toggle();
    }
  };

  const onSuccessClick = async e => {
    if (!onSuccess) {
      return;
    }

    const hasError = await onSuccess(e);

    if (!hasError) {
      toggle();
    }
  };

  return (
    <>
      <Button
        className={buttonClassName}
        color={buttonColor ? buttonColor : 'primary'}
        outline={buttonOutline}
        onClick={toggle}
      >
        {buttonBody}
      </Button>
      <RModal isOpen={isOpen} toggle={toggle}>
        <Form onSubmit={e => submitModal(e)}>
          <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
          <ModalBody>{modalBody()}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={e => onSuccessClick(e)} type="submit">
              {successButtonTitle ? successButtonTitle : 'Save'}
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </RModal>
    </>
  );
};

export default Modal;

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
