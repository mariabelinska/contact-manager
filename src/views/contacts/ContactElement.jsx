import React from 'react';
import PropTypes from 'prop-types';
import CustomModal from '../../components/CustomModal';

const ContactElement = ({
  contact,
  toggleEditContact,
  toggleDeleteContact,
  editContact,
  renderEditModalBody,
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
          customToggle={() => toggleEditContact(contact)}
          onModalSubmit={editContact}
          modalBody={renderEditModalBody}
          modalTitle="Edit contact"
          successButtonTitle="Save"
          buttonClassName="edit-icon"
          buttonColor="link"
          buttonBody={editButtonBody}
        />
        <CustomModal
          customToggle={() => toggleDeleteContact(contact)}
          modalBody={renderEditModalBody}
          modalTitle="Delete contact"
          buttonColor="link"
          buttonBody={deleteButtonBody}
        />
        {/* <Button color="link" onClick={() => toggleDeleteContact(contact)}>
          <i className="fas fa-trash-alt"></i>
        </Button> */}
      </div>
    </div>
  </>
);

const editButtonBody = <i className="fas fa-pen"></i>;

const deleteButtonBody = <i className="fas fa-trash-alt"></i>;

ContactElement.propTypes = {
  contact: PropTypes.object.isRequired,
  toggleEditContact: PropTypes.func.isRequired,
  toggleDeleteContact: PropTypes.func.isRequired,
};

export default ContactElement;
