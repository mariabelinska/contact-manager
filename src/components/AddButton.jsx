import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const AddButton = ({ title, onClick }) => (
  <Button className="add-button" outline color="primary" onClick={onClick}>
    {title}
  </Button>
);

AddButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AddButton;
