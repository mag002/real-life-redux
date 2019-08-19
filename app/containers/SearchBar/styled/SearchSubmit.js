import styled from 'styled-components';
import breakpoint from 'styles/breakpoint';

export default styled.div`
  padding: 0;  
  width: 10%;
  border-radius: 0 2px 2px 0;
  overflow: hidden;

  &:hover {
    background: rgba(146, 216, 141, 0.8);
  }

  .search-bar__submit-button {
    background: #00c3c4;
    height: 100%;
    width: 100%;
    font-size: 20px;
    color: white;
    
    i.fa {        
      font-weight: 400;
    }
  }
  @media(max-width:${breakpoint.md}){
    width:50px;
    flex-shrink:0;
  }
`;
