import React from 'react';
import PropTypes from 'prop-types';
import CustomModal from '../../components/CustomModal';
import { editButtonBody, deleteButtonBody } from '../../constants';

const ContactElement = ({
  contact,
  toggleContact,
  editContact,
  deleteContact,
  renderEditModalBody,
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
        <CustomModal
          onModalOpen={() => toggleContact(contact)}
          onModalSubmit={editContact}
          modalBody={renderEditModalBody}
          modalTitle="Edit contact"
          buttonClassName="edit-icon"
          buttonColor="link"
          buttonBody={editButtonBody}
        />
        <CustomModal
          onModalOpen={() => toggleContact(contact)}
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

const renderDeleteModalBody = errorMessage => {
  return (
    <>
      <p>Are you sure you want to delete this contact?</p>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </>
  );
};

ContactElement.propTypes = {
  contact: PropTypes.object.isRequired,
  toggleContact: PropTypes.func.isRequired,
};

export default ContactElement;
