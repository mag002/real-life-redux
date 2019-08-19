import env from '../env';
import request from '../utils/request';
import { REMOVE } from 'containers/FavoriteButton/constants';

export function addOrRemove(dealId, type) {
  let requestURL;

  if (type === REMOVE) {
    requestURL = `${env.API_URL}/favorite/remove-from-favorite`;
  } else {
    requestURL = `${env.API_URL}/favorite/add-to-favorite`;
  }

  const options = {
    method: 'POST',
    body: {
      dealId,
    },
  };

  return request(requestURL, options);
}

export function get(query) {
  const requestURL = `${env.API_URL}/favorite`;

  const options = {
    method: 'GET',
    params: query,
  };

  return request(requestURL, options);

  return request(requestURL, options);
}
