import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from 'components/Footer';
import authRoutes from '../Routes/authRoutes';
import Header from '../../components/Header';
import * as PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect/es';
import { makeSelectUserInfo } from './selectors';
import { connect } from 'react-redux';

class AuthPages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
    };
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
      <React.Fragment>
        <Header userInfo={this.state.userInfo} />

        <Switch>
          {
            authRoutes.map((prop, key) => (
              <Route
                path={prop.path}
                key={key}
                render={(routeProps) => <prop.component {...routeProps} />}
              />
            ))
          }
        </Switch>

        <Footer />
      </React.Fragment>
    );
  }
}

AuthPages.propTypes = {
  userInfo: PropTypes.object,
};


const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),

});
export default connect(
  mapStateToProps,
  null,
)(AuthPages);
