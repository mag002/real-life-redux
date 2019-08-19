import styled from 'styled-components';
import breakpoint from 'styles/breakpoint'

export default styled.div`
  display: flex;
  border-radius: 2px;

  .list-image {
    width: 38%;
    height: 280px;
  }
  
  .detail {
    margin-left: 10px;
    padding: 5px;
    width: 62%;
    display: flex;
    flex-direction: column;
    
    .list-group-item-heading {
    
    }
    
    .props {
      display: flex;
      
      button {
        font-size: 14px;
        color: black !important;
        min-width: 50px;
        
        &:not(:last-child) {
          margin-right: 20px;
        }
      }
    }
    
    .list-author {
      
      button {          
        color: black!important;
        font-size: 12px;
      }
    }
    
    .list-status {
    }
    
    .list-description {
      font-size: 14px;
      font-weight: 300;
      color: #000000;
    }
    
    .list-action {
      text-align: right;
      margin-top: auto;
      z-index: 10;
      width: fit-content;
      align-self: flex-end;
      
      button {
        color: black;
        font-size: 14px;
        text-decoration: underline black;
        cursor: pointer;
        margin-left: 10px;
        text-transform: capitalize;
        
        i.fa {
          font-weight: 300;
          font-size: 18px;
        }
      }
    }
  }
  @media (max-width:${breakpoint.md}){
    .list-image {
      width: 38%;
      height: 180px;
    }
    .detail{
      .inline:nth-child(3){
        display:block;
        .list-author{
          margin: 5px 0px;
          button{
            flex-direction:row-reverse;
            img{
              margin-left:0;
              margin-right:10px;
            }
          }
        }
      }
    }
    
  }
`;
