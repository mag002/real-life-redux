import React from 'react';
// import { Container } from 'reactstrap';
import Container from 'reactstrap/es/Container';
import FooterTitle from './styled/FooterTitle';
import FooterLink from './styled/FooterLink';
import Ul from './styled/Ul';
// import { FacebookShareButton, GooglePlusShareButton, LinkedinShareButton, TwitterShareButton, FacebookIcon, GooglePlusIcon, TwitterIcon, LinkedinIcon } from 'react-share';
// import MobileStoreButton from 'react-mobile-store-button';
import StyledFooter from './styled/StyledFooter';
// import Copyright from './styled/Copyright';
import FacebookIco from '../../images/icons/group-12.svg'
import BlogIco from '../../images/icons/group-11.svg'

export default function Footer() {
  // const shareLink = 'https://www.facebook.com/okxevietnam/';

  return (
    <StyledFooter className={'mt-auto'}>
      <Container>
        <div className={'row'}>
          <div className={'col-lg col-6 pl-5 pl-md-0'}>
            <FooterTitle className={'bp3-heading'}>Tips & Helps</FooterTitle>
            <Ul className={'d-block d-lg-flex'}>
              <li>
                <FooterLink to={'#'}>About Okxe</FooterLink>
              </li>
              <li>
                <FooterLink to={'#'}>Help</FooterLink>
              </li>
              <li>
                <FooterLink to={'#'}>Contact Us</FooterLink>
              </li>
              <li>
                <FooterLink to={'#'}>Term of Use</FooterLink>
              </li>
              <li>
                <FooterLink to={'#'}>Private Policy</FooterLink>
              </li>
            </Ul>
          </div>

          {/* <div className={'col-lg col-6'}>
            <FooterTitle className={'bp3-heading'}>Legal bits</FooterTitle>
            <Ul>
              <li>
                <FooterLink to={'#'}>Term of Use</FooterLink>
              </li>
              <li>
                <FooterLink to={'#'}>Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink to={'#'}>Posting Policy</FooterLink>
              </li>
              <li>
                <FooterLink to={'#'}>Cookie Policy</FooterLink>
              </li>
            </Ul>
          </div> */}

          

        <div className={'col-lg-3 col-6 pl-5 pl-md-0'}>
            <FooterTitle className={'bp3-heading'}>Find Us</FooterTitle>
            {/* <div className={'share'}> */}
              {/* <FacebookShareButton url={shareLink}>
                <FacebookIcon size={40} round />
              </FacebookShareButton>
              <GooglePlusShareButton url={shareLink}>
                <GooglePlusIcon size={40} round />
              </GooglePlusShareButton>
               */}
              <Ul className={'d-flex'}>
              <li>
                <a href="https://www.facebook.com/okxevietnam/" target="blank"><img style={{marginBottom:'10px'}} src={FacebookIco}/></a>
              </li>
              <li>
                <a to={'#'}><img src={BlogIco}/></a>
              </li>
              <li className={'d-none d-md-inline'}>
                <FooterLink to={'#'}>Contact Us</FooterLink>
              </li>
          
            </Ul>
              
            {/* </div> */}
          </div>

          <div className={'col-lg-3 p-0'}>
            <FooterTitle className={'bp3-heading d-none d-md-block'}>OKXE APP</FooterTitle>
            <Ul className='copyright'>
              <li>
                <FooterLink to={'#'}>© Copyright by Okxe 2019</FooterLink>
              </li>
            </Ul>
          </div>
        </div>
      </Container>

      {/* <Copyright>© Copyright by Okxe 2019</Copyright> */}
    </StyledFooter>
  );
}
