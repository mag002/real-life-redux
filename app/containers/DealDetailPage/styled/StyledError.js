import styled from 'styled-components';
import { Card } from '@blueprintjs/core';


export default styled(Card)`
  border-radius: 0;
  padding: 150px 0;
  justify-content: center;
  display: flex;
  flex-direction: column;
  
  .message-not-found {
    font-size: 20px;
    opacity: 0.3;
    text-align: center;
    width: 50%;
    display: inline-block;
    margin: 10px auto 20px;
  }
  
  .back-to-home {
    text-align: center;
    
    button {
      background-color: #f1f1f1;
      
      span {
        opacity: 0.3;
        color: #000000;
      }
    }
  }
`;

