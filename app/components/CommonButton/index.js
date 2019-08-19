/**
 *
 * CommonButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { isEmpty } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import StyledButton from './styled/StyledButton';

/* eslint-disable react/require-default-props */
function CommonButton(props) {
  const buttonProps = Object.assign({}, props);
  const propsToDelete = ['primary', 'social'];

  propsToDelete.map((value) => delete buttonProps[value]);

  const label = !isEmpty(props.label) && !props.children ? <span>{props.label}</span> : props.children;

  return (
    <StyledButton
      type={props.type || 'button'}
      {...buttonProps}
    >
      {label}
    </StyledButton>
  );
}

CommonButton.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  type: PropTypes.string,
};

export default CommonButton;
