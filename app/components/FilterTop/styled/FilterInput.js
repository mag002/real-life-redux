import styled from 'styled-components';

export default styled.div`
  flex-grow: 1;
  margin-left: 20px;
  position: relative;
  
  .bp3-input {
    font-size: 14px;
    color: black;
    border-radius: 0;
    padding: 20px 30px;
    
    &:hover {
      background-color: rgba(0,0,0,0.02);
    }
    
    &:focus {
      background-color: #ffffff;
      box-shadow: 0 0 0 1px ${(props) => props.theme.primaryColor};
    }
  }
  
  i.fa {
    color: #d8d8d8;
    font-weight: 300;
    font-size: 16px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 14px;
  }
`;
