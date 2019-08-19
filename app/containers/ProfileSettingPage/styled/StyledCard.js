import styled from 'styled-components';
import breakpoint from 'styles/breakpoint'
import {Card} from '@blueprintjs/core'

export default styled(Card)`
  @media (max-width:${breakpoint.md}){
    .ps-btn-group{
      display:flex;
      flex-direction:column-reverse;
    }
    .update{
      margin:0px!important;
    }
    .update,.cancel{
      box-shadow:none!important;
    }
    .row{
      padding-left:0px!important;
    }
  }
  @media (max-width:${breakpoint.xs}){
   
    .update,.cancel{
      box-shadow:none!important;
    }
  }
  
`;
