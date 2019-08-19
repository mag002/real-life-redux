import styled from 'styled-components';
import { imageCenterAlign } from 'styles/commonCss';
import breakpoint from 'styles/breakpoint';

export default styled.div`
  padding: 0 5px;
  width: 100%;
  position: relative;
  margin-bottom: 10px;

  .wrapper {
    border: 1px solid #d8d8d8;
    padding: 8px;
    background: #fff; 
    position: relative;
    transition: 1s;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }
  }
    
  .list-image {
    background-color: #f4f4f4;
    ${imageCenterAlign};
  }
  
  .list-amount {
    font-weight: 700;
    font-size: 18px;
    color: ${(props) => props.theme.primaryColor};
  }
  
  .list-date {
    opacity: 0.3;
    color: #000000;
    font-size: 12px;
    font-weight: 300;
  }
  
  .list-group-item-heading {
    color: #000000;
    position: relative;
  }
  
  .inline {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .favorite {
    z-index: 10;
  }
`;
