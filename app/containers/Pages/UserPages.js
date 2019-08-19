// import { isNull } from 'lodash';
import isNull from 'lodash/isNull';
import React from 'react';
import { makeSelectUserInfo } from './selectors';
import history from 'utils/history';
import { connect } from 'react-redux';
import Header from 'components/Header';
import Footer from 'components/Footer';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import Sidebar from 'components/Sidebar';
import AuthUtils from '../../utils/auth';
import { Switch } from 'react-router-dom';
import userRoutes from '../Routes/userRoutes';
// import { Container, Row, Col } from 'reactstrap';
import Col from 'reactstrap/es/Col';
import Row from 'reactstrap/es/Row';
import Container from 'reactstrap/es/Container';
import Breadcrumbs from 'components/Breadcrumbs';
import HeaderBanner from 'components/HeaderBanner';
import { userStatus } from '../../enums/EUserStatus';
import ProtectedRoute from 'containers/ProtectedRoute';
import { setUserInfo } from 'containers/App/actions';
import { createStructuredSelector } from 'reselect/es';
import { uploadAvatar } from './actions';
import injectSaga from 'utils/injectSaga';
import { KEY_APP } from './constants';
import saga from './saga';
import { compose } from 'redux';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import breakpoint from 'styles/breakpoint'

const StyledUserPages = styled.div`
  background: ${(props) => props.theme.backgroundColor};
  .side-bar-info{
    padding:0px;
  }
  @media (max-width:${breakpoint.md}){
    .side-bar-info{
      padding:15px;
    }
  }
`;

export class UserPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
    this.handleUploadAvatarSuccess = this.handleUploadAvatarSuccess.bind(this);
  }

  componentDidMount() {
    let userInfo = AuthUtils.getUserInfo();
    let token = AuthUtils.getToken();

    if (isNull(userInfo) || isNull(token)) {
      history.push('/auth/login');
    } else if (AuthUtils.getUserInfo().status === userStatus.INACTIVE) {
      history.push('/auth/complete-profile');
    } else {
      this.props.onSetUserInfo(userInfo);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo) {
      this.setState({
        userInfo: nextProps.userInfo,
      });
    }
  }

  handleUploadAvatar(avatar) {
    this.props.onUploadAvatar(avatar, this.handleUploadAvatarSuccess);
  }
  handleUploadAvatarSuccess(avatar) {
    let userInfo = AuthUtils.getUserInfo();
    userInfo.avatar = avatar;
    AuthUtils.setUserInfo(userInfo, true);
    this.props.onSetUserInfo(userInfo);
  }
  render() {
    const route = userRoutes.find((el) => el.path === this.props.location.pathname);

    return (
      <StyledUserPages>
        <Header userInfo={this.state.userInfo} />
        <HeaderBanner location={this.props.location} />
        <Container>
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { ...route },
            ]}
          />
          <Row>
            <Col md={3}
             className={'side-bar-info'}
             >
              <Sidebar {...this.props} routes={userRoutes} onUploadAvatar={this.handleUploadAvatar} />
            </Col>
            <Col md={9}>
              <Switch>
                {
                  userRoutes.map((prop) => (
                    <ProtectedRoute
                      path={prop.path}
                      key={Math.random()}
                      component={prop.component}
                    />
                  ))
                }
              </Switch>
            </Col>
          </Row>


        </Container>
        <Footer />
      </StyledUserPages>
    );
  }
}

UserPages.propTypes = {
  onSetUserInfo: PropTypes.func,
  userInfo: PropTypes.object,
  onUploadAvatar: PropTypes.func,
};


export function mapDispatchToProps(dispatch) {
  return {
    onSetUserInfo: (data) => dispatch(setUserInfo(data)),
    onUploadAvatar: (data, cbSuccess) => dispatch(uploadAvatar(data, cbSuccess)),
  };
}
const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: KEY_APP, saga });
const withReducer = injectReducer({ key: KEY_APP, reducer });
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserPages);
