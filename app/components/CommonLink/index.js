import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export default styled(Link)`
  color: ${(props) => props.theme.primaryColor};
  
  &:hover {
    color: ${(props) => darken(0.1, props.theme.primaryColor)};
    text-decoration: underline ${(props) => darken(0.1, props.theme.primaryColor)};
  }
  
  &:active {
    color: ${(props) => darken(0.2, props.theme.primaryColor)};
    text-decoration: underline ${(props) => darken(0.2, props.theme.primaryColor)};
  }
`;
