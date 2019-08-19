import styled from 'styled-components';
// import { Dropdown } from 'reactstrap';
import Dropdown from 'reactstrap/es/Dropdown';
import breakpoint from 'styles/breakpoint';

export default styled(Dropdown)`  
  .dropdown-toggle {
    background: transparent !important;
    border: none;
    line-height: 1.2;
    font-size: 12px !important;
    border-radius: 3px;
    transition: 0.3s;
    
    &:hover, &:focus, &:active {
      color: ${(props) => props.theme.primaryColor} !important;
    }

    &:focus {
      box-shadow: none !important;
    }

    &:after {
      transition: transform 0.3s;
      margin-left: 0.5em;
      transform: ${(props) => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
      margin-top: 1px;
      vertical-align: 0.2em;
    }
  }

  .dropdown-menu {
    border-radius: 0;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
    padding: 0;

    .dropdown-item {
      font-size: 14px !important;
      transition: 0.3s;
      color:  ${(props) => props.theme.darkColor};
      letter-spacing:1.2px;
      cursor: pointer;
      padding: 0;
     
      div {         
        padding: 20px;

        span {
          transition: 0.3s;
          display: flex;

          img {
            margin-right: 10px;
            opacity: 0.6;
            transition: 0.3s;
          }
        }
      }

      &:not(:last-child) {
        div {          
          border-bottom: 1px solid #d8d8d8;
        }
      }

      &.btn-logout {
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;

        i.fa {
          margin-left: auto;
          font-weight: 300;
          position: absolute;
          right: 20px;
          font-size: 20px;
        }
      }

      &:hover {
        background: #f4f4f4;        

        span {
          color: ${(props) => props.theme.primaryColor};

          img {
            opacity: 1;
          }
        }
      }

      &:active, &:focus {
        background: none;
        outline: none;
      }
    }
  }

  .show {
    button.dropdown-toggle {
      background: rgba(115, 134, 148, 0.3) !important;
    }
  }
  
  // position: relative;
  //
  // .btn-toggle {
  //   padding-right: 30px;
  //  
  //  
  // }
  //
  // .content {
  //   position: absolute;
  //   right: 0;
  //   top: 35px;
  //   background-color: white;
  //   box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  //  
  //   button {
  //     padding: 0 20px;
  //     text-align: left;
  //     cursor: pointer;
  //     width: 100%;
  //    
  //     div {
  //       padding: 20px 20px 20px 0;
  //       white-space: nowrap;
  //       display: block;
  //      
  //       span {
  //         transition: 0.3s;
  //         display: block;
  //         opacity: 0.3;
  //       }
  //      
  //       img {
  //         margin-right: 10px;
  //         opacity: 0.3;
  //         transition: 0.3s;
  //       }
  //     }
  //  
  //     &:not(:last-child) {
  //       div {          
  //         border-bottom: 1px solid #d8d8d8;
  //       }
  //     }
  //    
  //     &:hover {
  //       span {
  //         transform: translate(-2px, -2px);
  //         color: ${(props) => props.theme.primaryColor};
  //         opacity: 1;
  //        
  //         img {
  //           opacity: 1;
  //         }
  //       }
  //     }
  //   }
  // }
  @media (max-width:${breakpoint.ipX}){
    .dropdown-menu{
      transform: translate3d(-49px, 26px, 0px)!important;
      max-height:60vh;
      overflow:auto;
    }
  }
  @media (max-width:${breakpoint.md}){
    .dropdown-toggle {
     
      font-size: 14px !important;
    }
    
    .dropdown-menu{
      top:8px!important;
      left:15px!important;
      transform: translate3d(-156px, 28px, 0px)!important;
      max-height:80vh;
      overflow:auto;
    }
    .dropdown-item{
      width:100%;
      &>div, .postAdMobile{
        width:100%;
        border-radius:0!important;
      }
  
     
      
    }
  }
`;
