import styled from 'styled-components';
// import { Col } from 'reactstrap';
import Col from 'reactstrap/es/Col';

export default styled(Col)`
  padding: 0 5px;
  
  .bp3-card {
    border-radius: 0;
    //padding: 150px 0 200px;
    min-height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .icon {
    text-align: center;
    margin-bottom: 10px;
  }
  
  .message {
    text-align: center;
    font-size: 30px;
    opacity: 0.3;
  }
`;
