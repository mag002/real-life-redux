import styled from 'styled-components';

const StyledFooter = styled.div`
  background-color: ${(props) => props.theme.secondBackgroundColor};
  color: white;
  line-height: 1.8;
  font-weight: 300;
  text-align: center;
`;

export default StyledFooter;
