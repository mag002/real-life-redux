/* eslint-disable no-script-url */
import React from 'react';
import Wrapper from './styled/Wrapper';
import * as PropTypes from 'prop-types';
import ButtonLink from '../ButtonLink';

export default class SendOTP extends React.Component {
  render() {
    return (
      <Wrapper>
        {!this.props.sent ?
          <ButtonLink
            disabled={this.props.disabled}
            onClick={(e) => {
              e.preventDefault();
              this.props.onSendOTP();
            }}
          >
              Send OTP
            </ButtonLink> :
          <span>
            <span>
                A verification code will be send to your phone number. Didn't receive code?
              </span>
            <ButtonLink
              disabled={this.props.disabled}
              onClick={(e) => {
                e.preventDefault();
                this.props.onSendOTP();
              }}
            >Resend OTP</ButtonLink>
          </span>}
      </Wrapper>
    );
  }
}
SendOTP.propTypes = {
  onSendOTP: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  sent: PropTypes.bool.isRequired,
};
SendOTP.defaultProps = {
  disabled: true,
  sent: false,
};
