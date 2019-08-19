import styled from 'styled-components';

export default styled.div`
  position: absolute;
  right: 0;
  top: 8px;
  z-index: 10;
  
  button {
    margin: 5px 0;
    padding: 3px 10px;
    font-size: 14px;
    color: black;
    
    i.fa {
      font-size: 8px;
      font-weight: 300;
      position: absolute;
      display: none;
      margin-left: 2px;
    }
    
    &:hover {
      i.fa {
        display: inline-block;
      }
    }
    
    &.active, &:hover { 
      color: ${(props) => props.theme.primaryColor};
    }
  }
`;
