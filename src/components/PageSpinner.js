import PropTypes from 'prop-types';
import React from 'react';
import { Spinner } from 'react-bootstrap';

function PageSpinner ({ color = 'danger' }) {
  return (
      <div style={spinner_style}>
        <Spinner  animation="border" variant={color} />
      </div>
 
  );
};

const spinner_style = {
    position: 'absolute', 
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000000
    
}

PageSpinner.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
  ]),
};

export default PageSpinner;