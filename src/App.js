import React, { Component } from 'react';
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
import UserAvatar from 'react-user-avatar';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      person: null,
      modal: false,
    };

    this.onDragEnd = this.onDragEnd.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:5000/Contacts`)
      .then(response => response.json())
      .then(items => this.setState({ items: items.data }));
  }

  toggle(person) {
    this.setState(prevState => ({
      modal: !prevState.modal,
      person,
    }));
  }

  reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = this.reorder(this.state.items, result.source.index, result.destination.index);

    this.setState({
      items: items,
    });
  }

  render() {
    const { items } = this.state;

    if (!items) {
      return null;
    }

    return (
      <div id="body">
        <Navbar color="dark" light expand="md">
          <NavbarBrand id="navbar-brand" href="/">
            Halvaa OÜ
          </NavbarBrand>
        </Navbar>

        <ListGroup id="list-group" flush>
          <ListGroupItem id="list-group-item" disabled>
            Kontaktid
          </ListGroupItem>
        </ListGroup>

        <Container id="container">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {this.renderModal()}
                  {this.renderListViewItems(items)}
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

  renderListViewItems = items => {
    return (
      <ListGroup>
        {items.map((item, index) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <div id="draggable">
                  <ListGroupItem key={item.id} tag="a" onClick={() => this.toggle(item)} action>
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

  renderListViewInfo = item => {
    return (
      <>
        <div id="list-view-info">{this.renderAvatar(item.fullName)}</div>
        <b>{item.fullName}</b>
        <div id="list-view-div">
          <div id="list-view-p">
            <i className="fa fa-envelope" id="list-view-i"></i>
            <p>{item.email}</p>
          </div>
          <div id="list-view-p">
            <i className="fa fa-phone" id="list-view-i"></i>
            <p>{item.phone}</p>
          </div>
        </div>
      </>
    );
  };

  renderAvatar = (name, inDetailView) => {
    return (
      <UserAvatar
        className={inDetailView ? 'user-avatar-detail' : 'user-avatar-list'}
        colors={['#e6f2ff']}
        size="75"
        name={name ? name : 'Test Name'}
        // could add here a picture later
        // src={person.picture}
      />
    );
  };

  renderModal = () => {
    if (!this.state.person) {
      return null;
    }

    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Kontakti teave</ModalHeader>
        <ModalBody>{this.renderDetailInfo()}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggle}>
            Back
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  renderDetailInfo = () => {
    const { person } = this.state;

    if (!person) {
      return null;
    }

    return (
      <>
        <ListGroup flush id="detail-list-group">
          <ListGroupItem>
            <div id="detail-list-group-div">{this.renderAvatar(person.fullName, true)}</div>
            <b>{person.fullName}</b>
          </ListGroupItem>
        </ListGroup>
        <div id="detail-list-group-2">
          <div id="detail-div">
            <p>Email</p>
            <p>Phone</p>
          </div>
          <div>
            <p>{person.email}</p>
            <p>{person.phone}</p>
          </div>
        </div>
      </>
    );
  };
}

export default App;
