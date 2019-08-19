import { css } from 'styled-components';

export const imageCenterAlign = css`
  text-align: center;
  position: relative;
  
  img, .bp3-spinner {
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
`;
