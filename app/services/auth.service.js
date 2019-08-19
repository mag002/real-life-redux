import env from 'env';
import request from 'utils/request';
import { FORM_TYPE_LOGIN, FORM_TYPE_REGISTER, FORM_TYPE_FORGOT_PASSWORD, FORM_TYPE_COMPLETE_PROFILE } from 'containers/AuthPage/constants';
import axios from 'axios';
import auth from 'utils/auth';


export function submitFormAuthPage(formType, body) {
  let requestURL;

  switch (formType) {
    case FORM_TYPE_LOGIN:
      requestURL = `${env.API_URL}/users/login`;
      break;
    case FORM_TYPE_REGISTER:
      requestURL = `${env.API_URL}/users/register`;
      break;
    case FORM_TYPE_FORGOT_PASSWORD:
      requestURL = `${env.API_URL}/users/forgot-password`;
      break;
    case FORM_TYPE_COMPLETE_PROFILE:
      requestURL = `${env.API_URL}/users/complete-profile`;
      break;
    default:

  }

  return request(requestURL, { method: 'POST', body });
}
export function submitOTPForm(phone) {
  const requestURL = `${env.API_URL}/users/verify-code-register`;

  return request(requestURL, { method: 'POST', body: { phone } });
}
export function submitOTPForgotPasswordForm(phone) {
  const requestURL = `${env.API_URL}/users/verify-code-forgot-password`;

  return request(requestURL, { method: 'POST', body: { phone } });
}

export function uploadAvatar(formData) {
  const requestURL = `${env.API_URL}/users/avatar`;

  let config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  let token = auth.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return axios.post(requestURL, formData, config);
}
