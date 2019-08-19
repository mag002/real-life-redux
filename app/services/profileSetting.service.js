import env from 'env';
import request from '../utils/request';


export function submitChangePassword(data) {
  const requestURL = `${env.API_URL}/users/change-password`;

  return request(requestURL, { method: 'POST', body: { ...data } });
}

export function getUserInfo() {
  const requestURL = `${env.API_URL}/users/profile-setting`;

  return request(requestURL, { method: 'GET' });
}

export function submitUpdateProfileSetting(data) {
  const requestURL = `${env.API_URL}/users/profile-setting`;

  return request(requestURL, { method: 'POST', body: { ...data } });
}
