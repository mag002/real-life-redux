import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from 'components/Footer';
import Header from 'components/Header';
import HeaderBanner from 'components/HeaderBanner';
import pagesRoutes from '../Routes/pagesRoutes';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { setUserInfo } from '../App/actions';
import { createStructuredSelector } from 'reselect/es';
import { makeSelectUserInfo } from './selectors';
import { connect } from 'react-redux';
import AuthUtils from '../../utils/auth';
// import { isNull } from 'lodash';
import isNull from 'lodash/isNull';

const StyledPages = styled.div`
  background: ${(props) => props.theme.backgroundColor};
`;

class Pages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };
  }

  componentDidMount() {
    let userInfo = AuthUtils.getUserInfo();
    let token = AuthUtils.getToken();

    if (!isNull(userInfo) || !isNull(token)) {
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

  render() {
    return (
      <StyledPages>
        <Header userInfo={this.state.userInfo} />
        <HeaderBanner location={this.props.location} />
        <Switch>
          {
            pagesRoutes.map((prop, key) => (
              <Route
                path={prop.path}
                key={key}
                render={(routeProps) => <prop.component {...routeProps} />}
              />
            ))
          }
        </Switch>
        <Footer />
      </StyledPages>
    );
  }
}

Pages.propTypes = {
  onSetUserInfo: PropTypes.func,
  userInfo: PropTypes.object,
};


export function mapDispatchToProps(dispatch) {
  return {
    onSetUserInfo: (data) => dispatch(setUserInfo(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),

});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pages);
