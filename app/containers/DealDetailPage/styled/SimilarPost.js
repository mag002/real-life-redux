import styled from 'styled-components';
import breakpoint from 'styles/breakpoint'
export default styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
  
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  @media (max-width:${breakpoint.md}){
    margin-top:0px;
  }
`;
