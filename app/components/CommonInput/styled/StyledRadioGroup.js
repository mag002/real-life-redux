import styled from 'styled-components';
import { RadioGroup } from '@blueprintjs/core';

export default styled(RadioGroup)`
  border-bottom: 1px solid #d8d8d8;
  margin-bottom: 30px;
  
  .bp3-label {
    font-size: 14px;
  }
  
  .bp3-form-content {
    font-size: 18px;
  }
  
  .bp3-control input:checked ~ .bp3-control-indicator {
    background-color: ${(props) => props.theme.primaryColor} !important;
  }
  
  .bp3-control-indicator {
    &:focus, &:active  {
      outline: none;
    }
  }
  
  .bp3-control input:focus ~ .bp3-control-indicator {
    outline: none;
  }
`;
