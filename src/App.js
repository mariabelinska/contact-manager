import React from 'react';
import { Contacts } from './views/contacts/ContactList';
import { Nav } from './components/Navbar';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { CardFooter, Container } from 'reactstrap';
import './style/Global.css';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="body">
          <Nav />

          <Redirect from="/" to="/contacts" />

          <Container className="container">
            <Route exact path="/contacts" component={Contacts} />
          </Container>

          <CardFooter id="card-footer" />
        </div>
      </BrowserRouter>
    );
  }
}
