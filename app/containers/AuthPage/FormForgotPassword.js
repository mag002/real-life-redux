import React from 'react';
// import { isEmpty, get } from 'lodash';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { Classes } from '@blueprintjs/core';
import { FormValidation } from 'calidation';
import SendOTP from '../../components/SendOTP';
import CustomLink from '../../components/CommonLink';
import CommonInput from '../../components/CommonInput';
import CommonButton from '../../components/CommonButton';
import { FormTitle } from 'containers/AuthPage/styled/StyledForm';
import { isMinLength, isRequired, isComparePassword, isRegexMatchPhoneNumber } from '../../utils/formValidation';
import { configuration } from 'constants/index';
// import { Col, Row } from 'reactstrap';
import Col from 'reactstrap/es/Col';
import Row from 'reactstrap/es/Row';
import ErrorForm from '../../components/ErrorForm';

export default class FormForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      isDisabledSubmit: true,
    };
    this.handleDisableFormInput = this.handleDisableFormInput.bind(this);
  }

  handleDisableFormInput() {
    return !(get(this.props.modifiedData, 'code').length === configuration.CODE_LENGTH);
  }

  render() {
    const formConfig = {
      phone: {
        ...isRequired(),
        ...isRegexMatchPhoneNumber(),
      },
      code: {
        ...isRequired(),
        ...isMinLength(6),
      },
      password: {
        ...isRequired(),
        ...isMinLength(8),
      },
      confirm_password: {
        ...isRequired(),
        ...isMinLength(8),
        ...isComparePassword('password'),
      },
    };
    return (
      <Row className="justify-content-center">
        <Col md={5}>
          <FormTitle>Forgot Password</FormTitle>

          <FormValidation
            onSubmit={({ isValid }) => {
              if (isValid) {
                this.props.onSubmit();
              }
            }}
            config={formConfig}
          >
            {({ errors, submitted }) => (
              <div style={{ position: 'relative' }}>
                <CommonInput
                  autoFocus
                  label={'Phone'}
                  name={'phone'}
                  onChange={this.props.onChange}
                  type={'text'}
                  value={get(this.props.modifiedData, 'phone')}
                  errors={errors.phone}
                  submitted={submitted}
                  autoComplete="off"
                />

                <SendOTP
                  onSendOTP={this.props.onSendOTP}
                  sent={this.props.sentOTP}
                  disabled={isEmpty(get(this.props.modifiedData, 'phone'))}
                />

                <CommonInput
                  label={'Code'}
                  name={'code'}
                  onChange={this.props.onChange}
                  type={'text'}
                  value={get(this.props.modifiedData, 'code')}
                  errors={errors.code}
                  submitted={submitted}
                  autoComplete="off"
                />

                <CommonInput
                  label={'Set Password'}
                  name={'password'}
                  onChange={this.props.onChange}
                  type={'password'}
                  value={get(this.props.modifiedData, 'password')}
                  errors={errors.password}
                  submitted={submitted}
                  disabled={this.handleDisableFormInput()}
                  autoComplete="off"
                />

                <CommonInput
                  label={'Confirm Password'}
                  name={'confirm_password'}
                  onChange={this.props.onChange}
                  type={'password'}
                  value={get(this.props.modifiedData,
                    'confirm_password')}
                  errors={errors.confirm_password}
                  submitted={submitted}
                  disabled={this.handleDisableFormInput()}
                  autoComplete="off"
                />

                <CommonButton
                  className={classNames(Classes.FILL,
                    Classes.INTENT_PRIMARY, Classes.LARGE)}
                  type="submit"
                  disabled={this.handleDisableFormInput()}
                >Submit</CommonButton>
              </div>
            )}
          </FormValidation>

          <div className={'mt-4'}>
            <ErrorForm errorMessages={this.props.errorMessages} />
          </div>

          <div className={'mt-4 text-center'}>
            Already registered with Okxe? <CustomLink
            to="/auth/login"
          >Login</CustomLink>
          </div>
        </Col>
      </Row>
    );
  }
}

FormForgotPassword.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSendOTP: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  modifiedData: PropTypes.object,
  errorMessages: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  sentOTP: PropTypes.bool,
};
