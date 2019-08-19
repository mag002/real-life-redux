import { Button, Classes } from '@blueprintjs/core';
import styled, { css } from 'styled-components';
import { darken, transparentize } from 'polished';
import breakpoint from 'styles/breakpoint'

function generateBackgroundColor(backgroundColor) {
  return css`
    background-color: ${backgroundColor};
    transition:all 0.3s;
    border-radius: 2px !important;
    &:hover {
      background-color: ${darken(0.05, backgroundColor)};
    }
    
    &:active {
      background-color: ${darken(0.1, backgroundColor)};
    }
    
    &.bp3-disabled {
      background-color: ${transparentize(0.05, backgroundColor)};
    }
  `;
}

const StyledButton = styled(Button)`
  box-shadow: none !important;

  // Color
  &:not([class*="bp3-intent-"]) {
    box-shadow: 0 0 0 1px #d8d8d8 !important;
    ${generateBackgroundColor('white')}    
  }  
  
  &.${Classes.INTENT_PRIMARY} {
    ${(props) => generateBackgroundColor(props.theme.primaryColor)}
  }
  
  // Size  
  &.${Classes.LARGE} {
    padding: 0.8em 2em;
    font-size: 18px
  }
  &.mobile {
    font-size: 14px;
    font-weight: 400;
    background:none;
    box-shadow:none!important;
    padding:0px;
    color:#000000;
  }
  @media (max-width:${breakpoint.xs}){
    &.${Classes.LARGE} {
      font-size: 12.5px
    }
    &.update,&.cancel{
     box-shadow:none!important;
   }
  }

`;

export default StyledButton;
