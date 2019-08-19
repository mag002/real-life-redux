import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default styled(Link)`
  text-decoration: unset;
  color: unset;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 5;
    
  &:hover, &:focus {
    text-decoration: unset;
    color: unset;
  }
`;
