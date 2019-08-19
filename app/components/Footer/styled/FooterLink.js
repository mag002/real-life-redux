import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default styled(Link)`
  color: white;
  font-size: 14px;
  font-weight: 300;
  
  &:hover {
    color: ${(props) => props.theme.primaryColor};
  }
  
  &:active, &:focus {
    text-decoration: none;
  }
`;
