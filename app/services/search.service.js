import request from '../utils/request';
import env from 'env';

export function getBrandsReq() {
  const requestURL = `${env.API_URL}/brands`;

  return request(requestURL, { method: 'GET' });
}

export function onSearchDealReq(searchData) {
  const requestURL = `${env.API_URL}/deals/search`;

  return request(requestURL, { method: 'GET', params: searchData });
}
