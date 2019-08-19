import styled from 'styled-components';
import { Card } from '@blueprintjs/core';
import breakpoint from 'styles/breakpoint';

export default styled(Card)`
  border-radius: 0;
  //height: 500px;
  display: flex;
  flex-direction: column;

  .price {
    color: ${(props) => props.theme.primaryColor};
    font-size: 24px;
    font-weight: 700;
  }
  
  .title {
    font-size: 20px;
    font-weight: 300;
    color: black;
    max-width:90%;
  }
  
  .date {
    font-size: 12px;
    font-weight: 300;
    color: black;
    opacity: 0.56;
  }
  
  .author {
  
    button {      
      font-size: 12px;
      color: black !important;
    }
  }
  
  .description {
    font-size: 14px;
    font-weight: 300;
    color: black;
    transition: 0.3s;
  }
  
  .btn-more {
    padding-bottom:2px;
    align-self: flex-end;
    line-height:21px;
    font-style:initial;
    text-decoration:none;
    
    .dot-ellipsis{
      margin-right:2px;
      color:rgba(0,0,0,0.65);
      
    }
  }
  @media (max-width:${breakpoint.md}){
    background:transparent;
    box-shadow:none;
    .title {
      max-width:80%;
      word-break: break-word;
    }
  }
`;
