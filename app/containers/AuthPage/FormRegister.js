import React from 'react';
import * as PropTypes from 'prop-types';
import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import CommonButton from '../../components/CommonButton';
import CommonInput from '../../components/CommonInput';
import CustomLink from '../../components/CommonLink';
import SendOTP from '../../components/SendOTP';
import { FormValidation } from 'calidation';
import { isMinLength, isRequired, isComparePassword } from 'utils/formValidation';
// import { isEmpty, get} from 'lodash';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { FormTitle, FormSubTitle } from './styled/StyledForm';
import { eUserType } from 'enums/EUserType';
// import { Col, Row } from 'reactstrap';
import Col from 'reactstrap/es/Col';
import Row from 'reactstrap/es/Row';
import ErrorForm from '../../components/ErrorForm';

export default class FormRegister extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeUserType = this.handleChangeUserType.bind(this);
  }

  handleChangeUserType(e) {
    const target = {
      value: e.target.value,
      name: e.target.name,
    };

    this.props.onChange({ target });
  }

  render() {
    const formConfig = {
      phone: {
        ...isRequired(),
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
          <FormTitle>Register</FormTitle>

          <FormSubTitle>By signing up I agree to Okxe's Terms of Use and Privacy Policy and I consent to receiving
          marketing from Okxe and third party offer</FormSubTitle>

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
                  type={'phone'}
                  value={get(this.props.modifiedData, 'phone')}
                  errors={errors.phone}
                  submitted={submitted}
                  autoComplete="off"
                />

                <SendOTP
                  onSendOTP={this.props.onSendOTP}
                  sent={this.props.sentOTP}
                  disabled={isEmpty(
                      get(this.props.modifiedData, 'phone'))}
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
                  autoComplete="off"
                />

                <CommonInput
                  type={'radio'}
                  inline
                  label="Your Role"
                  name="type"
                  value={get(this.props.modifiedData, 'type')}
                  onChange={(e) => this.handleChangeUserType(e)}
                  radios={[
                      { label: eUserType.BUYER, value: eUserType.BUYER },
                      { label: eUserType.DEALER, value: eUserType.DEALER },
                  ]}
                >
                </CommonInput>

                <CommonButton
                  className={classNames(Classes.FILL,
                      Classes.INTENT_PRIMARY, Classes.LARGE)}
                  type="submit"
                >Submit</CommonButton>
              </div>
              )}
          </FormValidation>

          <div className={'mt-4'}>
            <ErrorForm errorMessages={this.props.errorMessages} />
          </div>

          <div className={'mt-4 text-center'}>
          Already registered with Okxe? <CustomLink to="/auth/login">Login</CustomLink>
          </div>
        </Col>
      </Row>
    );
  }
}

FormRegister.propTypes = {
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
