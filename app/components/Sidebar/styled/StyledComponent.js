import styled from "styled-components";
import breakpoint from 'styles/breakpoint'

export const StyledComponent = styled.div`
  border-radius: 2px;
  border: solid 1px #d8d8d8;
  background-color: #ffffff;
  margin-bottom: 20px;
  //padding-bottom: 70px;

  .logo {
    padding: 50px 0;
    text-align: center;

    .user-name {
      font-size: 16px;
      color: black;
    }

    .role {
      font-size: 12px;
      color: black;
    }
  }

  .sidebar-wrapper {
    padding: 0;

    li {
      position: relative;
      border-top: 1px solid ${props => props.theme.grayColor};
      transition:0.3s;
      &:hover{
        background:#f4f4f4;
      }
      a:active,
      a:focus {
        outline: 0;
        border: none;
      }

      .nav-link {
        padding: 20px 32px;
        color: ${props => props.theme.darkColor};
        transition: 0.3s;
        letter-spacing:1.2px;

        img {
          margin-right: 10px;
          opacity: 0.6;
          transition: 0.3s;
        }

        &.active,
        &:hover {
          border-left: 1px solid #d8d8d8;
          color: ${props => props.theme.primaryColor};
          
          img {
            opacity: 1;
          }
        }
       
        &.btn-logout {
          display: flex;
          align-items: center;
          width: 100%;
          position: relative;
          transition: 0.3s;

          i.fa {
            margin-left: auto;
            font-weight: 300;
            position: absolute;
            right: 10px;
            font-size: 20px;
          }

          &.active,
          &:hover {
            i.fa {
              opacity: 1;
            }
          }

          &:focus,
          &:active {
            outline: none;
          }
        }
      }

      &:last-child {
        border-bottom: 1px solid ${props => props.theme.grayColor};
      }
    }
  }
  @media (max-width:${breakpoint.md}){

      height:initial;
  

  }
`;
