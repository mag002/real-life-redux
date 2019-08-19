import styled from 'styled-components';
import iconDropdown from 'images/icons/drop-down-arrow.svg';

export default styled.div `
  border: solid 1px #d8d8d8;
  border-right: none;

  .ant-select {    
    .ant-select-selection {
      border: none !important;
      border-radius: 0;
      
      &:hover {
        background-color: rgba(0,0,0,0.02);
      }
      
      &:focus, &:active {
        box-shadow: none;
      }
    }
    
    .ant-select-selection--single {
      height: 100% !important;
    }
    
    .ant-select-selection__rendered {
      top: 50%;
      margin-left: 25px !important;
      transform: translateY(-50%);
    }  
    
    .ant-select-arrow {
      background-image: url(${iconDropdown});
      background-repeat: no-repeat;
      background-size: contain;
      width: 10px;
      height: 10px;
      margin-top: -4px;
      transition: 0.3s;
      
      i {      
        display: none;
      }
    }
    
    &.ant-select-open, &.ant-select-focused {
      .ant-select-selection {
        box-shadow: 0 0 0 1px ${(props) => props.theme.primaryColor};
        background-color: #ffffff !important;
        z-index: 2;
      }
    }
    
    &.ant-select-open {
      .ant-select-arrow {
        transform: rotate(180deg);
      }
    }
  }
`;
