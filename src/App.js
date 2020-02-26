import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  ListGroup,
  ListGroupItem,
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Navbar,
  NavbarBrand,
  CardFooter,
  FormGroup,
  Label,
  Col,
  Input,
  Form,
} from 'reactstrap';
import './App.css';
import { fetchData } from './services/fetch-data';
import { toast } from 'react-toastify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: null,
      contact: null,
      errorMessage: null,
      addContactModal: false,
      editContactModal: false,
      deleteContactModal: false,
    };
  }

  componentDidMount() {
    this.getContacts();
  }

  getContacts = async () => {
    const apiResponse = await fetchData({
      method: 'GET',
      url: `/Contacts`,
    });

    this.setState({ contactList: apiResponse.data });
  };

  addContact = async e => {
    e.preventDefault();

    const apiResponse = await fetchData({
      method: 'POST',
      url: `/Contacts`,
      json: {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
      },
    });

    if (apiResponse.errors) {
      this.setState({
        errorMessage: apiResponse.errors.map(e => e).join(', '),
      });

      return;
    }

    this.toggleAddContact();
    this.getContacts();

    if (this.state.errorMessage) {
      this.setState({
        errorMessage: null,
      });
    }

    toast.info('Contact has been added!');
  };

  editContact = async (e, id) => {
    e.preventDefault();

    const apiResponse = await fetchData({
      method: 'PATCH',
      url: `/Contacts/${id}`,
      json: {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
      },
    });

    if (apiResponse.errors) {
      this.setState({
        errorMessage: apiResponse.errors.map(e => e).join(', '),
      });

      return;
    }

    this.toggleEditContact();
    this.getContacts();

    if (this.state.errorMessage) {
      this.setState({
        errorMessage: null,
      });
    }

    toast.info('Contact has been edited!');
  };

  deleteContact = async id => {
    await fetchData({
      method: 'DELETE',
      url: `/Contacts/${id}`,
      hasNoResponse: true,
    });

    this.toggleDeleteContact();
    this.getContacts();

    toast.info('Contact has been deleted!');
  };

  toggleAddContact = contact => {
    this.setState(prevState => ({
      addContactModal: !prevState.addContactModal,
      contact,
    }));
  };

  toggleEditContact = contact => {
    this.setState(prevState => ({
      editContactModal: !prevState.editContactModal,
      contact,
    }));
  };

  toggleDeleteContact = contact => {
    this.setState(prevState => ({
      deleteContactModal: !prevState.deleteContactModal,
      contact,
    }));
  };

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const contactList = this.reorder(
      this.state.contactList,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      contactList: contactList,
    });
  };

  render() {
    const { contactList } = this.state;

    if (!contactList) {
      return null;
    }

    return (
      <div className="body">
        <Navbar color="dark" light expand="md">
          <NavbarBrand id="navbar-brand" href="/">
            Halvaa OÜ
          </NavbarBrand>
        </Navbar>

        <Container className="container">
          <Button className="add-button" outline color="primary" onClick={this.toggleAddContact}>
            Add contact
          </Button>

          {this.renderAddContactModal()}
          {this.renderEditContactModal()}
          {this.renderDeleteContactModal()}

          <h3 className="title">Contacts</h3>

          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {this.renderListViewItems(contactList)}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Container>
        <CardFooter id="card-footer" />
      </div>
    );
  }

  renderListViewItems = contactList => {
    return (
      <ListGroup>
        {contactList.map((contact, index) => (
          <Draggable key={contact.id} draggableId={contact.id} index={index}>
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div className="contact-item">
                  <ListGroupItem key={contact.id} tag="a" action>
                    {this.renderListViewInfo(contact)}
                  </ListGroupItem>
                </div>
              </div>
            )}
          </Draggable>
        ))}
      </ListGroup>
    );
  };

  renderListViewInfo = contact => {
    return (
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
            <Button
              className="edit-icon"
              color="link"
              onClick={() => this.toggleEditContact(contact)}
            >
              <i className="fas fa-cog"></i>
            </Button>
            <Button color="link" onClick={() => this.toggleDeleteContact(contact)}>
              <i className="fas fa-trash-alt"></i>
            </Button>
          </div>
        </div>
      </>
    );
  };

  renderAddContactModal = () => {
    const { contact, addContactModal } = this.state;

    if (!contact) {
      return null;
    }

    return (
      <Modal isOpen={addContactModal} toggle={this.toggleAddContact}>
        <Form onSubmit={e => this.addContact(e)}>
          <ModalHeader toggle={this.toggleAddContact}>Add contact</ModalHeader>
          <ModalBody>{this.renderContactFields()}</ModalBody>
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
    const { contact, editContactModal } = this.state;

    if (!contact) {
      return null;
    }

    return (
      <Modal isOpen={editContactModal} toggle={this.toggleEditContact}>
        <Form onSubmit={e => this.editContact(e, contact.id)}>
          <ModalHeader toggle={this.togglEditContact}>Edit contact</ModalHeader>
          <ModalBody>{this.renderContactFields(contact)}</ModalBody>
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
    const { contact, deleteContactModal } = this.state;

    if (!contact) {
      return null;
    }

    return (
      <Modal isOpen={deleteContactModal} toggle={this.toggleDeleteContact}>
        <ModalHeader toggle={this.toggleDeleteContact}>Delete contact</ModalHeader>
        <ModalBody>Are you sure you want to delete this contact?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.deleteContact(contact.id)}>
            Save
          </Button>
          <Button color="secondary" onClick={this.toggleDeleteContact}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  renderContactFields = contact => {
    const { errorMessage } = this.state;

    return (
      <>
        <FormGroup row>
          <Label sm={3}>First name</Label>
          <Col sm={9}>
            <Input
              required
              name="firstName"
              placeholder="first name"
              defaultValue={contact && contact.firstName}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3}>Last name</Label>
          <Col sm={9}>
            <Input
              required
              name="lastName"
              placeholder="last name"
              defaultValue={contact && contact.lastName}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3}>Email</Label>
          <Col sm={9}>
            <Input
              required
              name="email"
              placeholder="email"
              defaultValue={contact ? contact.email : null}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3}>Phone</Label>
          <Col sm={9}>
            <Input
              required
              name="phone"
              placeholder="phone"
              defaultValue={contact ? contact.phone : null}
            />
          </Col>
        </FormGroup>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </>
    );
  };
}

export default App;
