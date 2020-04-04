import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ name }) => {
  return <h3 className="title">{name}</h3>;
};

Title.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Title;
