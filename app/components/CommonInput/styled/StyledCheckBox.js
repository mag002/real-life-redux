import styled from 'styled-components';
import { Checkbox, Radio, TextArea, Classes } from '@blueprintjs/core';

export default styled(Checkbox) `
  &, &:hover {
    input:not(:disabled):active:checked, input:not(:disabled):active, input:checked {
      & ~ .bp3-control-indicator {
        background: ${(props) => props.theme.primaryColor};
      }
    }
  }
`;
