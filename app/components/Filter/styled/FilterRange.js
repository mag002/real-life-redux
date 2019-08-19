import styled, { keyframes } from "styled-components";

const pulseWithOpacity = keyframes`
  from {
    max-height: 0px;
    opacity:0;
    overflow:hidden;
  }

  to {
    max-height: 1000vh;
    opacity:1;
    overflow:hidden;
  }
`;
const pulseWithOpacityTest = keyframes`
  0% {
    max-height: 0px;
    opacity:0;
    overflow:hidden;
  }
  50%{
    max-height: 10%;
    opacity:0.5;
    overflow:hidden
  }
  100% {
    max-height: 1000vh;
    opacity:1;
    overflow:hidden;
  }
`;

export default styled.div`
  margin-top: 10px;
  & > div {
  
    width: calc((100% - 30px) / 2);
    display: inline-block;
   
    & > div:nth-child(3) {
      animation: ${pulseWithOpacityTest} 0.3s ease-in-out;
      padding:0 4px;
      border-radius:3px;
        div{
          
          cursor:pointer;
          margin-bottom:6px;
          border-radius:3px;
          div:hover{
          background-color:#e6f7ff;
        }
        div:last-child{
          margin-bottom:0px;
        }
      }
    }
  
    & > div:nth-of-type(1) {
      box-shadow:none;
      transition: all 0.5s;
      cursor:pointer;
      overflow: hidden;
      div:last-child {
        span {
          display: none;
        }
      }
    }
  }

  & > span {
    width: 30px;
    display: inline-block;
    text-align: center;
  }
`;
