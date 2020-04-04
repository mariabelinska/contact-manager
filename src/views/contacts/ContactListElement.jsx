import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const ContactListElement = ({ contact, toggleEditContact, toggleDeleteContact }) => (
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
        <Button className="edit-icon" color="link" onClick={() => toggleEditContact(contact)}>
          <i className="fas fa-pen"></i>
        </Button>
        <Button color="link" onClick={() => toggleDeleteContact(contact)}>
          <i className="fas fa-trash-alt"></i>
        </Button>
      </div>
    </div>
  </>
);

ContactListElement.propTypes = {
  contact: PropTypes.object.isRequired,
  toggleEditContact: PropTypes.func.isRequired,
  toggleDeleteContact: PropTypes.func.isRequired,
};

export default ContactListElement;
