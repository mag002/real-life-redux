/**
*
* ErrorForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { isEmpty, isArray } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import MessageError from './styled/MessageError';


class ErrorForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    if (!isEmpty(this.props.errorMessages)) {
      if (isArray(this.props.errorMessages)) {
        return (this.props.errorMessages.map((error) =>
          (<MessageError>
            {error}
          </MessageError>)));
      }

      return (
        <MessageError>
          {this.props.errorMessages}
        </MessageError>
      );
    }

    return null;
  }
}

ErrorForm.propTypes = {
  errorMessages: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
};

export default ErrorForm;
