import styled from 'styled-components';

export const StyledSearchPage = styled.div`
  .row-eq-height {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin-right: -15px;
    margin-left: -15px;
  }
  
  .thumbnail {
    margin-bottom: 20px;
    padding: 10px;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    transition: initial;
    width: 100%;
    background-color: white;
  }
  
  .title {
    font-weight: 400;
    font-size: 20px;
    .fa-plus{
      border-radius: 50%;
      width: 20px;
      height: 20px;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      margin-left:20px;
      font-weight: 100;
      transition:0.3s;
     
    }
    .active{
      
        transform:rotate(135deg);
        color:red;
      }

  }
  
  .total-result {
    font-size: 14px;
    font-weight: 300;
    color: #000000;
  }
`;
