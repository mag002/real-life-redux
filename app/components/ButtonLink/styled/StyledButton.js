import styled from 'styled-components';
// import { Button } from 'reactstrap';
import Button from 'reactstrap/es/Button';
import { darken } from 'polished';

export default styled(Button)`
  color: ${(props) => props.theme.primaryColor};
  font-size: 14px;
  font-style: italic;
  padding: 0;
  white-space: nowrap;
  border: none !important;
  
  &:hover {
    color: ${(props) => darken(0.05, props.theme.primaryColor)};
    text-decoration: underline ${(props) => darken(0.05, props.theme.primaryColor)};
  }
  
  &:active {
    color: ${(props) => darken(0.1, props.theme.primaryColor)};
    text-decoration: underline ${(props) => darken(0.1, props.theme.primaryColor)};
  }
`;
