import styled from 'styled-components';
import breakpoint from 'styles/breakpoint';

export default styled.ul`
  box-sizing:border-box;
  list-style: none;
  line-height: 30px;
  padding: 20px 50px 20px 0;
  justify-content:space-between;
  a {
    font-weight: 300;
    color:${(props) => props.theme.grayColor};
  }
  li{
    max-height:34px;
    
  }
  display:flex;

  min-height:80px;
  align-items:center;
  @media (max-width: ${breakpoint.md}) {
    justify-content:flex-start;
    
    padding: 20px 0px 20px 0;
    li{
      margin-right:10px;
    }

    &.copyright{
      justify-content: center;
      background: black;
      padding: 0;
      min-height: initial;
      line-height: 0;
      height: 30px;
      margin: 0;
    }
  }
`;
