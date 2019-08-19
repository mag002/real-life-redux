import styled from 'styled-components';
import Select from 'react-select';

export default styled(Select)`
  font-size: 18px;
  z-index: 15;
  
  & > div:nth-of-type(1) {
    border: none;
    background: transparent;
    border-radius: 0;
    border-bottom: 1px solid #d8d8d8;
    box-shadow: none !important;
    
    & > div:nth-of-type(2) span {
        display: none !important;
    }
  }
`;
