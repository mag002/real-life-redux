/*
 *
 * AuthPage actions
 *
 */

import { SUBMIT, SUBMIT_OTP, SUBMIT_FORGOT_PASSWORD_OTP, FETCH_LOCATION, UPLOAD_AVATAR } from './constants';

/**
 * Sends the request to the API
 * @return {string}
 */
export function submit(data, formType, callbackError, callbackSuccess) {
  return {
    type: SUBMIT, data, formType, callbackError, callbackSuccess,
  };
}

export function submitCompleteProfile(data, callbackError, callbackSuccess) {
  return {
    type: SUBMIT, data, callbackError, callbackSuccess,
  };
}

export function submitOTP(phone, callbackError) {
  return {
    type: SUBMIT_OTP, phone, callbackError,
  };
}

export function submitForgotPasswordOTP(phone, callbackError) {
  return {
    type: SUBMIT_FORGOT_PASSWORD_OTP, phone, callbackError,
  };
}

export function fetchLocaltionOnCompleteProfile(cbError) {
  return {
    type: FETCH_LOCATION, cbError,
  };
}

export function uploadAvatar(file, cbSuccess) {
  return {
    type: UPLOAD_AVATAR,
    file,
    cbSuccess,
  };
}
