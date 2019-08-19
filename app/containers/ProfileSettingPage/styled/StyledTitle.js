import styled from 'styled-components';
import breakpoint from 'styles/breakpoint'

export default styled.div`
  font-size: 16px;
  color: #000000;
  padding: 5px 20px;
  border-bottom: 1px solid ${(props) => props.theme.grayColor};
  margin: 20px 20px 20px 0;
  @media (max-width:${breakpoint.md}){
    padding:20px 20px 0px 0;
  }
  
`;
