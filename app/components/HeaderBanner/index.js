import React from 'react';
import logoheader from '../../images/logoheader.png';
// import { Container } from 'reactstrap';
import Container from 'reactstrap/es/Container';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CommonButton from 'components/CommonButton';
import { forwardTo } from '../../utils/history';
import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import breakpoint from 'styles/breakpoint'

const StyledComponent = styled.div`
    margin-bottom: 20px;
    background: #1d4848;
    
    .container {
      height: 90px;
      display: flex; 
      justify-content: space-between;
      align-items: center;
    
      img {
        height: 40px;
      }

      a {        
        button {
          height: 50px;
          width: 130px;      
          font-weight: 700;      
          font-size: 15px;
        }
      }
    }
    @media (max-width:${breakpoint.md}){
      display:none;
    }
`;


export default class HeaderBanner extends React.Component {
  render() {
    if (this.props.location.pathname === '/') {
      return null;
    }
    return (
      <StyledComponent>
        <Container>
          <Link to={'/'}>
            <img src={logoheader} alt={'logoheader'} />
          </Link>
          <CommonButton
            className={classNames(Classes.INTENT_PRIMARY, Classes.LARGE)}
            label="Post an ad"
            onClick={() => { forwardTo('/deal/create'); }}
          />
        </Container>
      </StyledComponent>
    );
  }
}

HeaderBanner.propTypes = {
  location: PropTypes.object,
};

HeaderBanner.defaultProps = {
  location: {
    pathname: '/',
  },
};
