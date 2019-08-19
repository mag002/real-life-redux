import styled from 'styled-components';
import breakpoint from '../../../styles/breakpoint';

export default styled.img`
  max-width: 250px;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2));
  
  @media (min-width: ${breakpoint.md}){
    width: 250px;
  }
`;
