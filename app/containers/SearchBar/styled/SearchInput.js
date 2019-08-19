import styled from 'styled-components';
import iconAddress from 'images/icons/map.svg';
import breakpoint from 'styles/breakpoint'

export default styled.div`
  padding: 0;
  width: 45%;
  position: relative;
  border: solid 1px #d8d8d8;
  border-right: none;

  input {
    font-size: 14px;
    height: 100%;
    background: rgb(255, 255, 255);
    border: 0;
    border-radius: 0;
    -webkit-appearance: none;
    position: absolute;
    transition: 0.3s;
    box-shadow: none;

    &.location-search-input {
      background: url(${iconAddress}) no-repeat scroll 10px 20px;
      padding-left: 50px;
    }
    
    &:hover {
      background-color: rgba(0,0,0,0.02);
    }
    
    &:focus {
      z-index: 2;
      background-color: #ffffff;
      box-shadow: 0 0 0 1px ${(props) => props.theme.primaryColor};
    }
  }

  .bp3-form-group {
    margin: 0;
  }
  
  .bp3-input-group {
    height: 100%;
    width: 100%;
    position: absolute;
    .bp3-input {
      position: relative;
      width: 100%;
      padding-left: 25px;
    }
  }
  @media (max-width:${breakpoint.md}){
    width:100%;
  }
  
`;
