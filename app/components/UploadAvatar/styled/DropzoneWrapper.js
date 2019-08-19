import styled from 'styled-components';

export default styled.section`
  margin-bottom: 20px;
  cursor: pointer;
  display: inline-block;

  div {
    display: flex;
    align-items: center;
    position: relative;
    
    &:focus {
      outline: none;
    }
    
    .preview {
      width: ${(props) => (props.size || '80px')};
      height: ${(props) => (props.size || '80px')};
      overflow: hidden;
      border-radius: 50%;
      border: solid 1px #d8d8d8;
      
      &.default-avatar { 
        margin-right: 10px;       
        width: 40px;
        height: 40px;
        opacity: 0.3;
      }
      
      img {
        width: 100%;
        height: auto;
      }
      .bp3-spinner {
        max-height: 100%;
        max-width: 100%;
        width: auto;
        height: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
      }
    }
    
    span {
      font-size: 18px;
      opacity: 0.3;
      color: black;
      text-decoration: underline black;
    }
    
    i.fa {
      position: absolute;
      font-size: 20px;
      border: 1px solid #d8d8d8;
      border-radius: 50%;
      height: 30px;
      width: 30px;
      align-items: center;
      display: flex;
      justify-content: center;
      right: 10px;
      bottom: 0px;
      background-color: #f4f4f4;
      
      &:before {
        color: #030104;
        opacity: 0.3;
      }
    }
  }
`;
