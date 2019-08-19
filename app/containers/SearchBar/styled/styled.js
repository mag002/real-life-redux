import styled from 'styled-components';
import iconDropdown from 'images/icons/drop-down-arrow.svg';
import breakpoint from 'styles/breakpoint'

export const StyledComponent = styled.div`
  margin: 20px 0 20px 0;
  width: 100%;
 
  &.mobile-view{
    position: absolute;
    left: 0;
    top: 50px;
    margin: 0px;
  }
  .search-bar {
    border: solid 0.3px #d8d8d8;
    background: white;
    display: flex;
    border-radius: 2px;
   
  }
  @media(max-width:${breakpoint.md}){
    .search-bar{
      min-height:50px;
    }
  }

  
`;
