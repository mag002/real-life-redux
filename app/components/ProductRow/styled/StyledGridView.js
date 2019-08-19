import styled from 'styled-components';
import breakpoint from 'styles/breakpoint'

export default styled.div `
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .list-image {
    height: 150px;
  }
  
  .list-amount, .list-group-item-heading {
    padding-left: 8px;
  }
  
  .list-group-item-heading {
    font-weight: 300;
  }
  
  .list-date {
    padding-left: 5px;
  }
  
  .inline {
    margin-top: auto;
  }
  @media (max-width:${breakpoint.md}){
    .twoPerRow {
      height: 200px;
    }
    
  }
`;
