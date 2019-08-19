import styled from 'styled-components';
import breakpoint from 'styles/breakpoint';

export default styled.button`
  font-size: 14px;
  color: #747474;
  padding: 0;
  cursor: ${(props) => props.hasOnClick ? 'pointer' : 'default'};
  display: flex;
  align-items: center;
  line-height: 1;
  
  img {
    ${(props) => props.textLeft ? 'margin-left' : 'margin-right'}: 0.5em;
  }
  
  &:hover, &:focus, &:active {
    text-decoration: none;
    color: #747474;
    outline: none;
  }
  @media (max-width:${breakpoint.md}){
    img {
      ${(props) => props.textLeft ? 'margin-left' : 'margin-right'}: 0.25em;
    }
  }
`;
