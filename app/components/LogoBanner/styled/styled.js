import styled from 'styled-components';
import { imageCenterAlign } from 'styles/commonCss';
import breakpoint from 'styles/breakpoint'
const StyledComponent = styled.div`

  .slick-list>div{
      display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 1em 1em;
    
  a {    
    ${imageCenterAlign}
    width:128px;
    height:128px;
    img {
      filter:grayscale(100%);
      opacity: 0.5;
      transition: 0.3s;
        
      &:hover {
        
        filter:grayscale(0%);     
      }
      
      &.active, &:hover {
        opacity: 1;
      }
    }
  }
}  
  @media (max-width: ${breakpoint.md}) {
    
    margin: 1em 0 0em;
    border-bottom: solid 1px #d8d8d8;
    a {
      max-width:80%;
      margin-right:26px;
    }
    a:first-child{
      margin-left:0px;
    }
    a:last-child{
      margin-right:0px;

    }
  }
  
`;

export default StyledComponent;
