import { injectGlobal } from "styled-components";
import breakpoint from 'styles/breakpoint';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'SF Pro Text', Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: black;
  }

  body.fontLoaded {
    font-family: 'SF Pro Text', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #f4f4f4;
    min-height: 100%;
    min-width: 100%;
  }
  // Ant-Dropdown
  .ant-select-dropdown{
    z-index:39
  }
  // Alert Popup Global
  .bp3-portal {
    .bp3-alert {
      background:white;
      max-width: 509px;
      width: 509px;
      padding: 20px 0 20px 0;
      border-radius:4px;
      .bp3-alert-contents {
        width: 100%;
        .alert-title{
          text-transform:uppercase;
          i{
            position:absolute;
            right:25px;
            font-weight:100;
            font-size:18px;
            top:5px;
            cursor:pointer;
          }
        }
        .alert-body {
          color: #000000;
          font-size: 18px;
          text-align: center;          
          .alert-title {
            padding: 0 0 20px 0;
            border-bottom: solid 1px #d8d8d8;            
          }
          .alert-content {            
            padding: 1rem;
            span{
              display:inline-block;
              margin-bottom:7px;
            }
            .price{
              color:#00c3c4;
            }
            .title{
              text-align:left;
            }
          }
        }
       
      }
     .bp3-alert-footer {
        justify-content: center;
        .bp3-button {
          border-radius:2px;
          transition:all 0.3s;  
          box-shadow:none;
          background-color: rgb(0, 195, 196);
          background-image: none;          
          color: white;          
          border: none;
          &:hover {
            opacity: 0.7;
          }
          &:not([class*="bp3-intent-"]) {
            box-shadow: none;
            border: solid 1px #d8d8d8;
            background-color: transparent;
            color: black;
          }
          .bp3-button-text {
            padding: 10px 60px 10px 60px;
            font-size: 18px;
          }
          
        } 
      }
    }
  }
  
  .ant-select-tree li span.ant-select-tree-switcher, .ant-select-tree li span.ant-select-tree-iconEle {
    line-height: 17px !important;
  }
  
  .dropdown-radius {
    .ant-select-tree li .ant-select-tree-node-content-wrapper {
      width: 100%;
      
      &:hover {
        width: 100%;
      }
    }
    
    .ant-select-tree-switcher-noop {
      display: none !important;
    }
  }
  
  .dropdown-cat {
    .ant-select-tree-switcher {
      opacity: 0.3;
    }
  }
  
  // Global remove outline
  a:active, a:focus, button:active, button:focus {
    outline: none;
    border: none;
  }
  @media(max-width:${breakpoint.md}){
    .bp3-alert{
      margin-top:50px!important;
    }
    .bp3-alert-footer {
        .bp3-button {
          margin:0px 5px!important;
          .bp3-button-text{
            font-size:12.5px!important;
            padding:10px 50px!important;
          }
        }
    }
    .LinesEllipsis{
      word-break:break-word;
    } 
  }
`;
