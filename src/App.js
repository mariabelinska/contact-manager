import React from 'react';
import { Contacts } from './components/Contacts';
import { Main } from './components/Main.jsx';
import { Nav } from './components/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import { CardFooter } from 'reactstrap';
import './style/App.css';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="body">
          <Nav />
          <Route exact path="/" component={Main} />
          <Route exact path="/contacts" component={Contacts} />
          <CardFooter id="card-footer" />
        </div>
      </BrowserRouter>
    );
  }
}
