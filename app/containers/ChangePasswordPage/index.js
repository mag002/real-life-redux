/**
 *
 * ChangePasswordPage
 *
 */
import React from 'react';
import saga from './saga';
import { compose } from 'redux';
import reducer from './reducer';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import { FormValidation } from 'calidation';
import injectReducer from 'utils/injectReducer';
import CommonInput from 'components/CommonInput';
// import { Row, Col } from 'reactstrap';
import Col from 'reactstrap/es/Col';
import Row from 'reactstrap/es/Row';
import { Classes, Card } from '@blueprintjs/core';
import { createStructuredSelector } from 'reselect/es';
import makeSelectChangePassowrdPage from './selectors';
import CommonButton from '../../components/CommonButton';
import { submit } from 'containers/ChangePasswordPage/actions';
import { KEY_APP } from 'containers/ChangePasswordPage/constants';
import { isRequired, isMinLength, isComparePassword } from 'utils/formValidation';
import StyledTitle from './styled/StyledTitle';
import ErrorForm from '../../components/ErrorForm';
import StyledCard from './styled/StyledCard'

export class ChangePasswordPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      errorMessages: '',
    };
    this.baseState = this.state;
    this.handleChange = this.handleChange.bind(this);
    this.handleResetState = this.handleResetState.bind(this);
    this.handleSubmitChangePassword = this.handleSubmitChangePassword.bind(this);
    this.callbackError = this.callbackError.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value, errorMessages: '' });
  }

  handleResetState() {
    this.setState(this.baseState);
  }

  callbackError(errorObj) {
    this.setState({ errorMessages: errorObj.payload.error });
  }

  handleSubmitChangePassword() {
    const data = {
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
    };
    this.props.onSubmit(data, this.callbackError, this.handleResetState);
  }

  render() {
    const formConfig = {
      currentPassword: {
        ...isRequired(),
        ...isMinLength(8),
      },
      newPassword: {
        ...isRequired(),
        ...isMinLength(8),
      },
      confirmPassword: {
        ...isRequired(),
        ...isMinLength(8),
        ...isComparePassword('newPassword'),
      },
    };

    return (
      <StyledCard style={{ borderRadius: 0, minHeight: '700px' }} className={'mb-3'}>
        <StyledTitle>Change your password</StyledTitle>
        <FormValidation
          onSubmit={({ isValid }) => {
            if (isValid) {
              this.handleSubmitChangePassword();
            }
          }}
          config={formConfig}
        >
          {({ errors, submitted }) => (
            <div className={'mb-5'}>
              <Row style={{ paddingLeft: '20px' }}>
                <Col lg={6}>
                  <CommonInput
                    autoFocus
                    didCheckErrors={false}
                    label={'Old password'}
                    name={'currentPassword'}
                    onChange={this.handleChange}
                    type={'password'}
                    value={this.state.currentPassword}
                    errors={errors.currentPassword}
                    submitted={submitted}
                  />

                  <CommonInput
                    didCheckErrors={false}
                    label={'New password'}
                    name={'newPassword'}
                    onChange={this.handleChange}
                    type={'password'}
                    value={this.state.newPassword}
                    errors={errors.newPassword}
                    submitted={submitted}
                  />

                  <CommonInput
                    didCheckErrors={false}
                    label={'Confirm password'}
                    name={'confirmPassword'}
                    onChange={this.handleChange}
                    type={'password'}
                    value={this.state.confirmPassword}
                    errors={errors.confirmPassword}
                    submitted={submitted}
                  />

                  <div className={'mt-4'} className={'ps-btn-group'}>

                    <CommonButton
                      className={classNames(Classes.LARGE,'cancel')}
                      onClick={this.handleResetState}
                    >Cancel</CommonButton>

                    <CommonButton
                      className={classNames(Classes.INTENT_PRIMARY, Classes.LARGE, 'ml-3','update')}
                      type="submit"
                    >Update password</CommonButton>
                  </div>
                </Col>
              </Row>

              <div className={'mt-4'}>
                <ErrorForm errorMessages={this.props.errorMessages} />
              </div>
            </div>
          )}
        </FormValidation>
      </StyledCard>
    );
  }
}

ChangePasswordPage.propTypes = {
  onSubmit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  changepasswordpage: makeSelectChangePassowrdPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (data, cbError, cbSucceed) => dispatch(
      submit(data, cbError, cbSucceed)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: KEY_APP, reducer });
const withSaga = injectSaga({ key: KEY_APP, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ChangePasswordPage);
