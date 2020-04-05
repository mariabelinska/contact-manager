import React from 'react';
import { FormGroup, Label, Col, Input } from 'reactstrap';
import PropTypes from 'prop-types';

export const ContactModalFields = ({ errorMessage, contact }) => (
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
    <Input
      hidden
      name="sequence"
      placeholder="sequence"
      defaultValue={contact ? contact.sequence : null}
    />
    {errorMessage && <div className="error-message">{errorMessage}</div>}
  </>
);

ContactModalFields.propTypes = {
  contact: PropTypes.object,
  errorMessage: PropTypes.string,
};
