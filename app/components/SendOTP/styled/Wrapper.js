import styled from 'styled-components';
import breakpoint from '../../../styles/breakpoint';

export default styled.div`
  @media(min-width: ${breakpoint.md}){
    position: absolute;
    left: 100%;
    top: 2.3em;    
    transform: translateY(-50%);
    font-style: italic;
    width: 50%;
    padding-left: 10px;
  }
`;
