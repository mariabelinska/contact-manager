import React from 'react';
import { Contacts } from './views/Contacts';
import { Nav } from './components/Navbar';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { CardFooter } from 'reactstrap';
import './style/Global.css';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="body">
          <Nav />

          <Redirect from="/" to="/contacts" />
          <Route exact path="/contacts" component={Contacts} />

          <CardFooter id="card-footer" />
        </div>
      </BrowserRouter>
    );
  }
}
