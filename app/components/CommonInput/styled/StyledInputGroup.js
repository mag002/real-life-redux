import styled from 'styled-components';
import { InputGroup } from '@blueprintjs/core';

const StyledInputGroup = styled(InputGroup)`
  .bp3-input {
    box-shadow: none;
    border-radius: 0;
    font-size: 18px;
    padding: 1em 0.2em;
    background-color: transparent;
    height: 1.2em;
  
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
`;

export default StyledInputGroup;
