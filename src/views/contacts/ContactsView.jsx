import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import { toast } from 'react-toastify';
import { getContacts, addContact, editContact, deleteContact } from '../../services/contacts';
import '../../style/Contacts.css';
import '../../style/Global.css';
import { getSequenceAfterAdd } from '../../services/sequences';
import { Loader } from '../../components/Loader';
import { DragDropElementList } from '../../components/DragDropElementList';
import { ContactModalFields } from './ContactModalFields';
import ContactListElement from './ContactListElement';
import AddButton from '../../components/AddButton';
import Title from '../../components/Title';

export class ContactsView extends React.Component {
  state = {
    contactList: null,
    contact: null,
    errorMessage: null,
    addContactModal: false,
    editContactModal: false,
    deleteContactModal: false,
  };

  componentDidMount() {
    this.getContacts();
  }

  setContactList = newContactList => {
    this.setState({ contactList: newContactList });
  };

  getContacts = async () => {
    const apiResponse = await getContacts();

    this.setState({ contactList: apiResponse.data });
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
      return;
    }

    this.toggleAddContact();
    this.getContacts();

    toast.info('Contact has been added');
  };

  editContact = async (e, id) => {
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
      return;
    }

    this.toggleEditContact();
    this.getContacts();

    toast.info('Contact has been edited');
  };

  deleteContact = async (e, id) => {
    e.preventDefault();

    const apiResponse = await deleteContact(id);

    if (apiResponse && apiResponse.errors) {
      this.setErrorMessage(Object.values(apiResponse.errors));
      return;
    }

    this.toggleDeleteContact();
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

  toggleAddContact = contact => {
    this.setState(prevState => ({
      addContactModal: !prevState.addContactModal,
      contact,
    }));

    this.removeErrorMessage();
  };

  toggleEditContact = contact => {
    this.setState(prevState => ({
      editContactModal: !prevState.editContactModal,
      contact,
    }));

    this.removeErrorMessage();
  };

  toggleDeleteContact = contact => {
    this.setState(prevState => ({
      deleteContactModal: !prevState.deleteContactModal,
      contact,
    }));
  };

  render() {
    const { contactList } = this.state;

    if (!contactList) {
      return <Loader />;
    }

    return (
      <>
        <AddButton title="Add contact" onClick={this.toggleAddContact} />

        {this.renderAddContactModal()}
        {this.renderEditContactModal()}
        {this.renderDeleteContactModal()}

        <Title name="Contacts" />

        <DragDropElementList
          list={contactList}
          listElement={this.renderContactListElement}
          updateList={this.setContactList}
        />
      </>
    );
  }

  renderContactListElement = contact => (
    <ContactListElement
      contact={contact}
      toggleEditContact={this.toggleEditContact}
      toggleDeleteContact={this.toggleDeleteContact}
    />
  );

  renderAddContactModal = () => {
    const { contact, addContactModal, errorMessage } = this.state;

    if (!contact) {
      return null;
    }

    return (
      <Modal isOpen={addContactModal} toggle={this.toggleAddContact}>
        <Form onSubmit={e => this.addContact(e)}>
          <ModalHeader toggle={this.toggleAddContact}>Add contact</ModalHeader>
          <ModalBody>
            <ContactModalFields errorMessage={errorMessage} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Save</Button>
            <Button color="secondary" onClick={this.toggleAddContact}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  };

  renderEditContactModal = () => {
    const { contact, editContactModal, errorMessage } = this.state;

    if (!contact) {
      return null;
    }

    return (
      <Modal isOpen={editContactModal} toggle={this.toggleEditContact}>
        <Form onSubmit={e => this.editContact(e, contact.id)}>
          <ModalHeader toggle={this.togglEditContact}>Edit contact</ModalHeader>
          <ModalBody>
            <ContactModalFields contact={contact} errorMessage={errorMessage} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Save</Button>
            <Button color="secondary" onClick={this.toggleEditContact}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  };

  renderDeleteContactModal = () => {
    const { contact, deleteContactModal, errorMessage } = this.state;

    if (!contact) {
      return null;
    }

    return (
      <Modal isOpen={deleteContactModal} toggle={this.toggleDeleteContact}>
        <ModalHeader toggle={this.toggleDeleteContact}>Delete contact</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this contact?</p>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={e => this.deleteContact(e, contact.id)}>
            Confirm
          </Button>
          <Button color="secondary" onClick={this.toggleDeleteContact}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  };
}
