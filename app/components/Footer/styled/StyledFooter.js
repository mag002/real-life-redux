import styled from 'styled-components';
import breakpoint from 'styles/breakpoint';

const StyledFooter = styled.footer`
  background-color: ${(props) => props.theme.primaryBackgroundColor};
  padding-top: 50px;
  margin-top: 50px;
  
  .share {
    display: flex;
    justify-content: flex-star;
    padding: 30px 0 0 0;
    & > div{
      margin-right:25px;
    }
  }
  
  .app {
    padding: 30px 0 0 0;
  }
  
  .bp3-heading {
    text-transform: uppercase;
  }
  @media (max-width:${breakpoint.md}){
    .container{
      max-width:initial!important;
    }
  }
`;

export default StyledFooter;
