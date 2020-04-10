import React from 'react';
import { toast } from 'react-toastify';
import { getContacts, addContact, editContact, deleteContact } from '../../services/contacts';
import '../../style/Contacts.css';
import '../../style/Global.css';
import { getSequenceAfterAdd } from '../../services/sequences';
import { Loader } from '../../components/Loader';
import { DragDropList } from '../../components/DragDropList';
import { ContactModalFields } from './ContactModalFields';
import ContactElement from './ContactElement';
import Title from '../../components/Title';
import Modal from '../../components/Modal';

export class ContactsView extends React.Component {
  state = {
    contactList: null,
    contact: null,
    errorMessage: null,
  };

  componentDidMount() {
    this.getContacts();
  }

  getContacts = async () => {
    const apiResponse = await getContacts();

    this.updateContactList(apiResponse.data);
  };

  updateContactList = newContactList => {
    this.setState({ contactList: newContactList });
  };

  addContact = async e => {
    e.preventDefault();

    const { firstName, lastName, email, phone } = e.target;
    const { contactList } = this.state;

    const sequence = getSequenceAfterAdd(contactList);

    const apiResponse = await addContact({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      sequence,
    });

    if (apiResponse.errors) {
      this.setErrorMessage(apiResponse.errors);
      return apiResponse.errors;
    }

    this.getContacts();

    toast.info('Contact has been added');
  };

  editContact = async e => {
    const { id } = this.state.contact;

    e.preventDefault();

    const { firstName, lastName, email, phone, sequence } = e.target;

    const apiResponse = await editContact(id, {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      sequence: sequence.value,
    });

    if (apiResponse.errors) {
      this.setErrorMessage(apiResponse.errors);
      return apiResponse.errors;
    }

    this.getContacts();

    toast.info('Contact has been edited');
  };

  deleteContact = async e => {
    const { id } = this.state.contact;

    e.preventDefault();

    const apiResponse = await deleteContact(id);

    if (apiResponse && apiResponse.errors) {
      this.setErrorMessage(apiResponse.errors);
      return apiResponse.errors;
    }

    this.getContacts();

    toast.info('Contact has been deleted');
  };

  removeErrorMessage = () => {
    if (this.state.errorMessage) {
      this.setState({
        errorMessage: null,
      });
    }
  };

  setErrorMessage = errors => {
    this.setState({
      errorMessage: `Error(s): ${errors.map(e => e).join(', ')}`,
    });
  };

  toggleContact = contact => {
    this.setState({
      contact,
    });

    this.removeErrorMessage();
  };

  render() {
    const { contactList } = this.state;

    if (!contactList) {
      return <Loader />;
    }

    return (
      <>
        <Modal
          customToggle={this.toggleContact}
          onModalSubmit={this.addContact}
          modalBody={this.renderAddModalBody}
          modalTitle="Edit contact"
          buttonBody="Add contact"
          buttonClassName="add-button"
          buttonOutline
        />

        <Title name="Contacts" />

        <DragDropList
          list={contactList}
          listElement={this.renderContactElement}
          updateList={this.updateContactList}
        />
      </>
    );
  }

  renderContactElement = contact => (
    <ContactElement
      contact={contact}
      toggleContact={this.toggleContact}
      editContact={this.editContact}
      deleteContact={this.deleteContact}
      renderEditModalBody={this.renderEditModalBody}
      openedContact={this.state.contact}
      errorMessage={this.state.errorMessage}
    />
  );

  renderAddModalBody = () => <ContactModalFields errorMessage={this.state.errorMessage} />;
}
