import styled, { css } from 'styled-components';
import { FormGroup } from '@blueprintjs/core';
import icoError from 'images/icons/delete.svg';

const StyledFormGroup = styled(FormGroup)`
  position: relative;
  padding-top: 1.2em;
  opacity: ${(props) => props.disabled ? '0.5' : '1'};
  margin-bottom: 3em;
  
  ${(props) => props.hasError ? css`
    &:after {
      content: '';
      position: absolute;
      background-image: url(${icoError});
      width: 12px;
      height: 12px;
      background-position: center right;
      background-size: contain;
      top: 53%;
      right: 8px;
      transform: translateY(-50%);
    }
  ` : ''}

  .bp3-label {
    transition: 0.25s;
    position: absolute;
    top: ${(props) => (props.isChanged || props.readOnly) ? '0' : '1.2em'};
    left: ${(props) => (props.isChanged || props.readOnly) ? '0' : '0.2em'};
    opacity: 0.3;
    font-size: ${(props) => (props.isChanged || props.readOnly) ? '14px' : '18px'};
    font-weight: 700;
    color: black;
  }
  
  .bp3-form-content {
    .bp3-form-helper-text {
      color: #b41a1a;
      font-style: italic;
    }
    
    .location-search-input {
      position: relative;
      box-shadow: none;
      border-radius: 0;
      font-size: 18px;
      padding: 1em 0.2em;
      background-color: transparent;
      border: none;
      color: black;
    
      &:focus {
        box-shadow: none;
      }
      
      &:disabled, &.bp3-disabled {
        background-color: unset;
      }
      
      &:not([readonly]) {
        border-bottom: 1px solid #d8d8d8;
      }
    }
  }  
`;

export default StyledFormGroup;
