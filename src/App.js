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
} from 'reactstrap';
import './App.css';
import { fetchData } from './services/fetch-data';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: null,
      contact: null,
      addContactModal: false,
      deleteContactModal: false,
    };
  }

  componentDidMount() {
    this.getContacts();
  }

  getContacts = async () => {
    const apiResponse = await fetchData({
      method: 'get',
      url: `/Contacts`,
    });

    this.setState({ contactList: apiResponse.data });
  };

  deleteContact = async id => {
    await fetchData({
      method: 'delete',
      url: `/Contacts/${id}`,
      hasNoResponse: true,
    });

    this.toggleDeleteContact();
    this.getContacts();
  };

  toggleAddContact = contact => {
    this.setState(prevState => ({
      addContactModal: !prevState.addContactModal,
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
      <div id="body">
        <Navbar color="dark" light expand="md">
          <NavbarBrand id="navbar-brand" href="/">
            Halvaa OÜ
          </NavbarBrand>
        </Navbar>

        <Container id="container">
          <Button className="add-button" outline color="primary" onClick={this.toggleAddContact}>
            Add contact
          </Button>

          <h3 className="title">Contacts</h3>

          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {this.renderDetailViewModal()}
                  {this.renderDeleteContactModal()}
                  {this.renderListViewItems(contactList)}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Container>
        <CardFooter id="card-footer" className="text-muted" />
      </div>
    );
  }

  renderListViewItems = contactList => {
    return (
      <ListGroup>
        {contactList.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div id="draggable">
                  <ListGroupItem key={item.id} tag="a" action>
                    {this.renderListViewInfo(item)}
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
        <div id="list-view-div">
          <div id="list-view-p">
            <i className="fa fa-envelope" id="list-view-i"></i>
            <p>{contact.email}</p>
          </div>
          <div id="list-view-p">
            <i className="fa fa-phone" id="list-view-i"></i>
            <p>{contact.phone}</p>
          </div>
        </div>

        <Button color="link" onClick={() => this.toggleDeleteContact(contact)}>
          <i className="fas fa-trash-alt"></i>
        </Button>

        <Button color="link" onClick={() => this.toggleAddContact(contact)}>
          <i className="fas fa-cog"></i>
        </Button>

        <i className="fas fa-arrows-alt" style={{ color: '#007bff' }}></i>
      </>
    );
  };

  renderDetailViewModal = () => {
    const { contact, addContactModal } = this.state;

    if (!contact) {
      return null;
    }

    return (
      <Modal isOpen={addContactModal} toggle={this.toggleAddContact}>
        <ModalHeader toggle={this.toggleAddContact}>Edit contact</ModalHeader>
        <ModalBody>{this.renderDetailInfo()}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleAddContact}>
            Cancel
          </Button>
        </ModalFooter>
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

  renderDetailInfo = () => {
    const { contact } = this.state;

    if (!contact) {
      return null;
    }

    return (
      <div id="detail-list-group-2">
        <div id="detail-div">
          <p>Email</p>
          <p>Phone</p>
        </div>
        <div>
          <p>{contact.email}</p>
          <p>{contact.phone}</p>
        </div>
      </div>
    );
  };
}

export default App;
