import styled from 'styled-components';
import breakpoint from 'styles/breakpoint';

export const StyledDealForm = styled.div`
  form {
    border-radius: 2px;
    border: solid 1px #d8d8d8;
    background-color: #ffffff;
    margin-bottom: 50px;
    padding: 45px;
  }
  
  h4 {
    font-size: 24px;
    letter-spacing: 0.3px;
    margin: 30px;
  }
  
  .upload-image {
    margin-top: 10px;
    margin-bottom: 10px;
    
    .title, .sub-title {
      color: rgba(0,0,0,0.65);
      opacity: 0.5;
    }
    
    .title {
      font-size: 18px;
    };
    
    .sub-title {
      font-size: 12px;
      margin-bottom: 10px;
    }
  }
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
      text-align:center;
    }
    .row{
      padding-left:0px!important;
    }
  }
`;
