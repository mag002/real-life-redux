import styled from 'styled-components';
import SearchSelect from './SearchSelect';

export default styled(SearchSelect)`
  position: relative;
  width: 120px;
  border-left: none;

  &::before {
    top: 50%;
    margin-top: -8px;
    height: 16px;
    z-index: 1;
    content: '';
    position: absolute;
    width: 1px;
    background: rgb(235, 235, 235);
  }
`;
