import styled from 'styled-components';
import iconDropdown from 'images/icons/drop-down-arrow.svg';

export default styled.div `
  overflow: hidden;
  transition: 0.3s;
  
  .btn-toggle {
    height: 30px;
    width: 100%;
    position: absolute;
    top: 10px;
    z-index: 10;
    
    &:after {
      content: '';
      background-image: url(${iconDropdown});
      width: 10px;
      height: 100%;
      position: absolute;
      background-size: contain;
      background-position: center center;
      right: 0;
      top: 0;
      transform: ${(props) => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
      transition: 0.3s;
    }
  }
  
  .selected {
    position: absolute;
    top: 15px;
    right: 0;
    padding-right: 20px;
    color: ${(props) => props.theme.primaryColor};
  }
  
  ul {
    list-style: none;
    padding-left: 0;
    margin-bottom: 0;
    margin-top: 5px;
    
    li {      
      button {
        width: 100%;
        text-align: left;
        padding: 5px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        i.fa {
          font-weight: 400;
          display: none;
        }
        
        &:hover {
          i.fa {
            display: block;
          }
        }
        
        &.active, &:hover {
          background-color: rgba(0,0,0,0.05);
          color: ${(props) => props.theme.primaryColor};
        }
      }
    }
  }
`;
