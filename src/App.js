import React from 'react';
import { ContactsView } from './views/contacts/ContactsView';
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
            <Route exact path="/contacts" component={ContactsView} />
          </Container>

          <CardFooter id="card-footer" />
        </div>
      </BrowserRouter>
    );
  }
}
