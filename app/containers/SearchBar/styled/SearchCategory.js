import styled from 'styled-components';
import iconCategory from 'images/icons/select.svg';
import SearchSelect from './SearchSelect';

export default styled(SearchSelect)`
  background: rgb(255, 255, 255);
  padding: 0;
  width: 10%;  
  border-radius: 2px 0 0 2px;
  
  .ant-select, .ant-select-selection {    
    border-radius: inherit !important;
  }

  .ant-select-selection__rendered {    
    span[title="All"] {
      background: url(${iconCategory}) no-repeat scroll 0 50%;
      color: rgba(255,255,255,0);
    }
  }
`;
