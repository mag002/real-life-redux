/**
 *
 * FavoriteButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import icoStar from '../../images/star-copy-8.svg';
import icoStarActive from '../../images/star.svg';
import { addOrRemove } from './actions';
import { DAEMON } from 'utils/constants';
import auth from 'utils/auth';
import { forwardTo } from 'utils/history';
import makeSelectFavoriteButton from './selectors';
import ButtonLinkWithIcon from 'components/ButtonLinkWithIcon';
import { CommonToaster } from '../../components/CommonToaster';
import { Intent } from '@blueprintjs/core';
import StyledButton from '../../components/ButtonLinkWithIcon';

export class FavoriteButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isActive: props.added,
      icon: props.added ? icoStarActive : icoStar,
    };

    this.handleAddOrRemove = this.handleAddOrRemove.bind(this);
    this.handleCallBackSuccess = this.handleCallBackSuccess.bind(this);
    this.callbackError = this.callbackError.bind(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.isClicked !== nextProps.isClicked && nextProps.isClicked) {
      this.handleAddOrRemove();
    }
  }

  callbackError(error) {
    CommonToaster.show({
      message: error,
      intent: Intent.DANGER,
    });
  }

  handleAddOrRemove() {
    if (!auth.getToken()) {
      forwardTo('/auth/login');
      return;
    }

    this.props.addOrRemove(this.props.dealId, this.state.isActive, this.handleCallBackSuccess, this.callbackError);
  }

  handleCallBackSuccess() {
    this.setState({
      isActive: !this.state.isActive,
    });

    if (this.props.callbackSuccess) {
      this.props.callbackSuccess();
    }
  }

  render() {
    let icon = this.state.icon;

    return (
      <ButtonLinkWithIcon
        icon={icon}
        onClick={this.handleAddOrRemove}
        className={this.props.className}
        onMouseOver={() => this.setState({ icon: icoStarActive })}
        onMouseOut={this.props.added ? (() => true) : (() => this.setState({ icon: icoStar }))}
        onFocus={() => true}
        onBlur={() => true}
        textLeft
      >
        {this.props.total_favorite.toString()}
      </ButtonLinkWithIcon>
    );
  }
}

FavoriteButton.propTypes = {
  dealId: PropTypes.number,
  addOrRemove: PropTypes.func,
  added: PropTypes.bool, // true: ad added to favorite list
  total_favorite: PropTypes.number,
  className: PropTypes.string,
  callbackSuccess: PropTypes.func,
  isClicked: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  favoritebutton: makeSelectFavoriteButton(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addOrRemove,
    },
    dispatch
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'favoriteButton', reducer });
const withSaga = injectSaga({ key: 'favoriteButton', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(FavoriteButton);
