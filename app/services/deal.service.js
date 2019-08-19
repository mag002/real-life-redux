import env from '../env';
import request from '../utils/request';
import { toQueryString } from '../utils/utilities';
import axios from 'axios';

export function getDeal(dealId, params = {}) {
  const requestURL = `${env.API_URL}/deals/${dealId}`;

  const options = {
    method: 'GET',
    params,
  };

  return request(requestURL, options);
}

export function getDealAsGuest(slug, params = {}) {
  const requestURL = `${env.API_URL}/deals/guest/${slug}`;

  const options = {
    method: 'GET',
    params,
  };

  return request(requestURL, options);
}

export function getMyDealsReq(query) {
  const requestURL = `${env.API_URL}/deals`;

  const options = {
    method: 'GET',
    params: query,
  };

  return request(requestURL, options);
}

export function deleteDealReq(dealId) {
  const requestURL = `${env.API_URL}/deals/${dealId}`;

  const options = {
    method: 'DELETE',
  };

  return request(requestURL, options);
}

export function updateDealReq(dealId, data) {
  const requestURL = `${env.API_URL}/deals/${dealId}`;

  const options = {
    method: 'PUT',
    body: data,
  };

  return request(requestURL, options);
}

export function createDealReq(data) {
  const requestURL = `${env.API_URL}/deals/`;

  const options = {
    method: 'POST',
    body: data,
  };

  return request(requestURL, options);
}

export function uploadImages(formData) {
  const requestURL = `${env.API_URL}/deals/images`;

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  return axios.post(requestURL, formData, config);
}
