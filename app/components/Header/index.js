import React from 'react';
import { Alignment, Navbar } from '@blueprintjs/core';
// import { Col, Container, Row, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import Col from 'reactstrap/es/Col';
import Container from 'reactstrap/es/Container';
import Row from 'reactstrap/es/Row';
import DropdownItem from 'reactstrap/es/DropdownItem';
import DropdownMenu from 'reactstrap/es/DropdownMenu';
import DropdownToggle from 'reactstrap/es/DropdownToggle';
import { Link } from 'react-router-dom';
import auth from 'utils/auth';
import history, { forwardTo } from 'utils/history';
import userRoutes from 'containers/Routes/userRoutes';
import ProfileButton from './styled/ProfileButton';
import StyledHeader from './styled/StyledHeader';
import icoLogout from 'images/icons/mbri-logout.svg';
import * as PropTypes from 'prop-types';
import { eUserType } from 'enums/EUserType';
import { userStatus } from 'enums/EUserStatus';
import logoheader from '../../images/logoheader.png';
import SearchPageMobile from './SearchPageMobile';
import CommonButton from 'components/CommonButton'
import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      displayName: '',
      collapseSearchMobile: false,
    };

    this.handleSearchMobile = this.handleSearchMobile.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo) {
      let displayName = '';
      if (nextProps.userInfo.status === userStatus.INACTIVE) {
        displayName = nextProps.userInfo.phone;
      } else {
        displayName = nextProps.userInfo.type === eUserType.BUYER ? nextProps.userInfo.name : nextProps.userInfo.store_name;
      }
      this.setState({
        displayName,
      });
    }
  }

  // handleFilterChange(params) {
  //   let self = this;

  //   setTimeout(() => {
  //     let dataFilter = {
  //       ...self.state.dataPagination,
  //     };

  //     Object.keys(params).map((key) => {
  //       dataFilter[key] = params[key];
  //       return key;
  //     });

  //     self.setState({
  //       dataPagination: dataFilter,
  //       // isSearching: true,
  //     });
  //   }, 50);
  // }

  toggle() {
    this.setState({
      collapseOpen: !this.state.collapseOpen,
      collapseSearchMobile:false
    });
  }
  handleSearchMobile(){
    this.setState({
      collapseSearchMobile: !this.state.collapseSearchMobile,
      collapseOpen:false
    });
    console.log("OK")
  }

  render() {
    return (
      <StyledHeader>
        <Navbar fixedToTop>
          <Container >
           
            <Row className={'m-0'}>
              <Col xs={3} className={'p-0'}>
                <Navbar.Group align={Alignment.LEFT}>
                  <Link to="/"  className={'d-none d-md-flex'}><i
                    className="fa fa-home"
                    aria-hidden="true"
                  /></Link>
                  {/* <Link*/}
                  {/* to={`/search?userType=${eUserType.BUYER}`}*/}
                  {/* >Private</Link>*/}
                  {/* <Link*/}
                  {/* to={`/search?userType=${eUserType.DEALER}`}*/}
                  {/* >Dealer</Link>*/}
                  {/* <Link to={'/search?userType='}>All</Link>*/}
                 
                  <i
                  onClick={this.handleSearchMobile}
                  href="#" 
                  style={{marginLeft:'0'}} 
                  className={'d-block d-md-none navbar-mobile fas fa-search'} >
                  
                  </i>
                  {/* <Sidebar
                    onChange={this.handleFilterChange}
                    brands={this.state.brands}
                    filterData={this.state.dataPagination}
                    location={this.props.location}
                  /> */}
                </Navbar.Group>
              </Col>
              <Col xs={6} className={'nav-logo'}>
           
              <Navbar.Group align={Alignment.LEFT}>
                <Link to="/" className={'d-block d-md-none navbar-mobile ml-0 '}><img src={logoheader} alt={'logo-header'} /></Link>
                  </Navbar.Group>  
                </Col>
              <Col xs={3} className={'p-0'}>
                <Navbar.Group align={Alignment.RIGHT}>
                  {
                    auth.getToken() === null ?
                      <Link to="/auth/login" className={'btn-login'}><i
                        className="fa fa-user-circle"
                        aria-hidden="true"
                      /> <span className={'d-none d-md-inline'}>Login/Register</span></Link> :
                      <ProfileButton
                        isOpen={this.state.collapseOpen}
                        toggle={this.toggle}
                      >
                        <DropdownToggle caret>
                          {/* {`Hello, ${auth.getUserInfo() !== null ? auth.getUserInfo().phone : 'Anonymous'}`}*/}
                          <span className={'d-none d-md-inline'}>{`Hello, ${this.state.displayName}`}</span>
                          <i className="fas fa-user d-inline d-md-none"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                          {userRoutes.map((item) => (
                            <DropdownItem
                              key={`${Math.random()}`}
                              onClick={() => forwardTo(item.path)}
                            >
                              <div>
                                <span><img
                                  src={item.icon}
                                  alt={item.name}
                                />{item.name}</span>
                              </div>
                            </DropdownItem>
                          ))}
                          <DropdownItem
                            onClick={() => {
                              auth.clearToken();
                              auth.clearUserInfo();
                              if (history.location.pathname.includes('user')) {
                                history.push('/');
                              } else {
                                window.location.reload();
                              }
                            }}
                            className={'btn-logout'}
                          >
                            <div>
                              <span><img src={icoLogout} alt={'logout'} />Logout</span>
                            </div>
                          </DropdownItem>
                          <DropdownItem>
                          <CommonButton
                            className={classNames(Classes.INTENT_PRIMARY, Classes.LARGE,'postAdMobile','d-md-none')}
                            label="Post an ad"
                            onClick={() => { forwardTo('/deal/create'); }}
                          />
                          </DropdownItem>
                        </DropdownMenu>
                      </ProfileButton>

                  }
   
           
                </Navbar.Group>

              </Col>
              
              <SearchPageMobile redirect={this.handleSearchMobile} className={`d-block d-md-none`} show={this.state.collapseSearchMobile}></SearchPageMobile>
            
              {/* <Navbar.Group align={Alignment.RIGHT} className={'d-inline d-md-none navbar-mobile'}>
             
              </Navbar.Group> */}
            </Row>
           
          </Container>
          
        </Navbar>
      </StyledHeader>
    );
  }
}
Header.propTypes = {
  userInfo: PropTypes.object,
};
