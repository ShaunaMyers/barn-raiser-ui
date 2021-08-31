import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({errorMessage}) => {
  return <h3 className="error-message">{errorMessage}</h3>
}

export default ErrorMessage;
