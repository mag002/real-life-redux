import styled from 'styled-components';
// import { Table } from 'reactstrap';
import Table from 'reactstrap/es/Table';
import breakpoint from 'styles/breakpoint'

export default styled(Table)`
  border: 1px solid #dee2e6;
  margin-bottom: 0;

  tbody {
    tr:nth-of-type(odd) {
      background-color: unset;
    }
    
    tr:nth-of-type(even) {
      background-color: rgba(0,0,0,.05);
    }
    
    .props-title {
      opacity: 0.56;
      font-size: 12px;
    }
    
    .props-value {
      font-size: 14px;
      font-weight: 400;
    }
  }
  @media(max-width:${breakpoint.md}){
    tbody {
      tr:nth-of-type(odd) {
        background-color: white;
      }
      
      tr:nth-of-type(even) {
        background-color: transparent;
      }
    
    }
    margin-top:20px!important;
  }
`;
