/**
*
* ButtonLink
*
*/

import React from 'react';
import StyledButton from './styled/StyledButton';
// import styled from 'styled-components';
import PropTypes from 'prop-types';


class ButtonLink extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <StyledButton
        color="link"
        disabled={this.props.disabled}
        onClick={this.props.onClick || ((e) => e.preventDefault())}
        className={this.props.className}
      >
        {this.props.children}
      </StyledButton>
    );
  }
}

ButtonLink.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default ButtonLink;
