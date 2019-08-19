import styled from 'styled-components';
import breakpoint from 'styles/breakpoint'

export const StyledTransactionsPage = styled.div`
  position: relative;
  @media (max-width:${breakpoint.md}){
    margin-top:25px;
    .detail{
      .inline:nth-child(3){
        display:block;
        .list-author{
          button{
            flex-direction:row-reverse;
            img{
              margin-left:0;
            }
          }
        }
      }
    }
  }

`;
