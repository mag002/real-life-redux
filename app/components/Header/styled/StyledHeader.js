import styled from 'styled-components';
import breakpoint from 'styles/breakpoint'
const heightHeader = '35px';
const heightHeaderMobile = '50px';

export default styled.header`
  height: ${heightHeader};
  position: relative;
  z-index: 40;
  .bp3-navbar {
    height: ${heightHeader};    
    background-color: #223232;
    z-index: 20;
    .row{
      width: 100%;
    }
    .bp3-navbar-group {
      height: ${heightHeader};  
      
      a {
        color: white;
        font-size: 12px;
        display: flex;
        align-items: center;
        
        i.fa {
          font-size: 16px;
        }
        
        &:not(:first-child) {
          margin-left: 3em;
        }
        
        &:hover {
          color: ${(props) => props.theme.primaryColor}
        }
        
        &:active, &:focus {
          text-decoration: none;
        }
        
        &.btn-login {
          i.fa {          
            margin-right: 10px;
          }
        }
      }
      
      .bp3-button, .bp3-icon {        
        color: white;
        font-size: 12px;
        
        &:hover {
          outline: none;
          background: rgba(115, 134, 148, 0.3);
        }
      }
    }
  }
  .fa-search{
    color:white;
    font-size:16px;
    cursor:pointer;
    font-weight:400;
     
    &:hover {
      color: ${(props) => props.theme.primaryColor}
    }
    
    
        
  }
  
  @media (max-width:${breakpoint.md}){
    height: ${heightHeaderMobile};
    .nav-logo{
      justify-content: center;
      align-items: center;
      display: flex;
    }
    .container{
      padding: 0px;
    }
    .bp3-navbar {
      height: ${heightHeaderMobile};    
      .bp3-navbar-group {
        height: ${heightHeaderMobile};  
      }
    }
    .navbar-mobile {
      align-items:center;
      justify-content:space-between;
      padding:0px;
      i{
        font-size: 20px;
        font-weight: 200;
        
      }
      img{
        height:23px;
      }
    }
  }
`;
