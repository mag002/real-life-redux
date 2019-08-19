import styled from 'styled-components';
import breakpoint from 'styles/breakpoint'
export default styled.div`
  text-align: right;
  
  a {
    font-size: 14px;
    color: #000000;
    padding-bottom: 5px;
    opacity: 0.2;
    transition: 0s;
    
    &:first-child {      
      margin-right: 20px;
    }
    
    &:focus, &:hover {
      text-decoration: none;
      outline: none;
    }
    
    &.active, &:hover {
      color: ${(props) => props.theme.primaryColor};
      opacity: 1;
    }
  }
  @media (max-width: ${breakpoint.md}) {
    a:first-child{
      margin-right:10px;
    }
    a{
      font-size:18px;
    }
    &.searchPageBtnGroup{
      margin:auto;
      margin-right:0px;
    }
  }
`;
