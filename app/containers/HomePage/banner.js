import React from 'react';
import logoheader from '../../images/logoheader.png';
import logo from '../../images/banner.jpg';
// import { Container } from 'reactstrap';
import Container from 'reactstrap/es/Container';
import styled from 'styled-components';
import classNames from 'classnames';
import { Classes } from '@blueprintjs/core';
import { forwardTo } from '../../utils/history';
import CommonButton from '../../components/CommonButton';

const StyledHomepage = styled.div`
    background-image: url(${logo});
    height: 435px;
    background-size: cover;
    background-position: center center;
    position:relative;
    &:after{
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      background-image: linear-gradient(to right,#0000007a,#ffffff00,#ffffff00);
      top: 0px;
      left: 0px;
    }
    img {
      height: 80px;
      padding-top: 40px;
    }  
    button {
    margin-top: 30px;
    float: right;
    }  
    
    .title {
      font-size: 40px;      
      font-weight: 900;     
      letter-spacing: 2.4px;      
      color: rgb(255, 255, 255);
      margin-top: 100px;
    }
    
    .description {
      font-size: 20px;      
      font-weight: 300;      
      letter-spacing: 2.4px;      
      color: rgb(255, 255, 255);      
      width: 450px;
    }
    .container{
      position:relative;
      z-index:1;
    }
`;


const Banner = (props) => (
  <StyledHomepage className={'d-none d-md-block'} >
    <Container>
      <img src={logoheader} width={'auto'} alt={'logo-header'} />
      <CommonButton
        className={classNames(Classes.INTENT_PRIMARY, Classes.LARGE)}
        label="Post an ad"
        onClick={() => { forwardTo('/deal/create'); }}
      />
      {/* <div className="title">
        <p>THE UNIVERSE</p>
      </div>
      <div className="description">
        <p>Direct Mail Advertising How I Made 47 325 In 30 Days By Mailing 2 200 Letters</p>
      </div> */}
    </Container>
  </StyledHomepage>
    );

export default Banner;
