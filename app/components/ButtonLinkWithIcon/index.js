/**
*
* ButtonLinkWithIcon
*
*/

import React from 'react';
import StyledButton from './styled/StyledButton';
import PropTypes from 'prop-types';

// import styled from 'styled-components';


class ButtonLinkWithIcon extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let text;
    if (this.props.children) {
      text = this.props.children;
    } else if (this.props.text) {
      text = this.props.text;
    }

    return (
      <StyledButton
        role="button"
        onClick={this.props.onClick || ((e) => { e.preventDefault(); })}
        tabIndex={0}
        className={`${this.props.className || ''}`}
        hasOnClick={!!this.props.onClick}
        onMouseOver={this.props.onMouseOver ? (this.props.onMouseOver) : (() => true)}
        onMouseOut={this.props.onMouseOut ? (this.props.onMouseOut) : (() => true)}
        onFocus={this.props.onFocus ? (this.props.onFocus) : (() => true)}
        onBlur={this.props.onBlur ? (this.props.onBlur) : (() => true)}
        textLeft={this.props.textLeft}
      >
        {this.props.textLeft && text}
        <img
          src={this.props.icon}
          width={this.props.width || 20}
          height={this.props.height || 20}
          alt={this.props.altIcon || 'icon'}
        />
        {!this.props.textLeft && text}
      </StyledButton>
    );
  }
}

ButtonLinkWithIcon.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  altIcon: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  textLeft: PropTypes.bool,
};

export default ButtonLinkWithIcon;
