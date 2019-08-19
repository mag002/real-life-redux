import React from 'react';
import PropTypes from 'prop-types';
// import { get, isArray, isEmpty } from 'lodash';
import get from 'lodash/get';
import { Classes } from '@blueprintjs/core';
import CommonButton from '../../components/CommonButton';
import CommonInput from '../../components/CommonInput';
import CustomLink from '../../components/CommonLink';
import classNames from 'classnames';
import { FormValidation } from 'calidation';
import { isMinLength, isRequired, isRegexMatchPhoneNumber } from '../../utils/formValidation';
import { FormTitle } from './styled/StyledForm';
// import { Col, Row } from 'reactstrap';
import Col from 'reactstrap/es/Col';
import Row from 'reactstrap/es/Row';
import * as inputTypes from 'components/CommonInput/constants';
import ErrorForm from '../../components/ErrorForm';

export default class FormLogin extends React.Component {
  render() {
    const formConfig = {
      phone: {
        ...isRequired(),
        ...isRegexMatchPhoneNumber(),
      },
      password: {
        ...isRequired(),
        // ...isMinLength(),
      },
    };

    return (
      <Row className="justify-content-center">
        <Col md={5}>
          <FormTitle>Sign in</FormTitle>

          <FormValidation
            onSubmit={({ isValid }) => {
              if (isValid) {
                this.props.onSubmit();
              }
            }}
            config={formConfig}
          >
            {({ errors, submitted }) => (
              <div>
                <CommonInput
                  autoFocus
                  didCheckErrors={false}
                  label={'Phone'}
                  name={'phone'}
                  onChange={this.props.onChange}
                  type={'text'}
                  value={get(this.props.modifiedData, 'phone')}
                  errors={errors.phone}
                  submitted={submitted}
                  autoComplete="off"
                />

                <CommonInput
                  didCheckErrors={false}
                  label={'Password'}
                  name={'password'}
                  onChange={this.props.onChange}
                  type={'password'}
                  value={get(this.props.modifiedData, 'password')}
                  errors={errors.password}
                  submitted={submitted}
                  autoComplete="off"
                />

                <CommonInput
                  name={'rememberMe'}
                  type={inputTypes.CHECKBOX}
                  onChange={this.props.onChange}
                  value={get(this.props.modifiedData, 'rememberMe')}
                  label={'Remember me'}
                />

                <CommonButton
                  className={classNames(Classes.FILL, Classes.INTENT_PRIMARY,
                    Classes.LARGE)}
                  type="submit"
                >Login</CommonButton>
              </div>
            )}
          </FormValidation>

          <div className={'mt-4'}>
            <ErrorForm errorMessages={this.props.errorMessages} />
          </div>

          <div className={'mt-4 d-flex'}>
            <CustomLink to="/auth/forgot-password">Forgot your
              password?</CustomLink>
            <span className={'ml-auto'}>Doesn't have an account? <CustomLink
              to="/auth/register">Sign up</CustomLink></span>
          </div>
        </Col>
      </Row>
    );
  }
}

FormLogin.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  modifiedData: PropTypes.object,
  errorMessages: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
};
