import React from 'react';
import { Navbar, NavbarBrand, NavLink } from 'reactstrap';
import '../style/Navbar.css';

export const Nav = () => (
  <Navbar color="dark" light expand="md">
    <NavbarBrand id="navbar-brand" href="/">
      Halvaa OÜ
    </NavbarBrand>
    <NavLink id="nav-link" href="/contacts">
      Contacts
    </NavLink>
  </Navbar>
);
