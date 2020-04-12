import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../components/Modal';
import { editButtonBody, deleteButtonBody } from '../../constants';
import { ContactModalFields } from './ContactModalFields';

const ContactElement = ({
  contact,
  toggleContact,
  editContact,
  deleteContact,
  openedContact,
  errorMessage,
}) => (
  <>
    <b>{contact.fullName}</b>
    <div className="contact-information">
      <div>
        <div className="contact-information-row">
          <i className="fa fa-envelope" id="icon"></i>
          <p>{contact.email}</p>
        </div>
        <div className="contact-information-row">
          <i className="fa fa-phone" id="icon"></i>
          <p>{contact.phone}</p>
        </div>
      </div>
      <div className="icons">
        <Modal
          customToggle={() => toggleContact(contact)}
          onModalSubmit={editContact}
          modalBody={() => renderEditModalBody(openedContact, errorMessage)}
          modalTitle="Edit contact"
          buttonClassName="edit-icon"
          buttonColor="link"
          buttonBody={editButtonBody}
          errorMessage={errorMessage}
        />
        <Modal
          customToggle={() => toggleContact(contact)}
          onSuccess={deleteContact}
          modalBody={() => renderDeleteModalBody(errorMessage)}
          modalTitle="Delete contact"
          buttonColor="link"
          buttonBody={deleteButtonBody}
          successButtonTitle="Confirm"
        />
      </div>
    </div>
  </>
);

const renderEditModalBody = (openedContact, errorMessage) => (
  <ContactModalFields contact={openedContact} errorMessage={errorMessage} />
);

const renderDeleteModalBody = errorMessage => (
  <>
    <p>Are you sure you want to delete this contact?</p>
    {errorMessage && <div className="error-message">{errorMessage}</div>}
  </>
);

ContactElement.propTypes = {
  contact: PropTypes.object.isRequired,
  toggleContact: PropTypes.func.isRequired,
  editContact: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  openedContact: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default ContactElement;
