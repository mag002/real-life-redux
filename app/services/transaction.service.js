import env from '../env';
import request from '../utils/request';

export function createTransactionReq(data) {
  const requestURL = `${env.API_URL}/transactions/`;

  const options = {
    method: 'POST',
    body: data,
  };

  return request(requestURL, options);
}

export function getTransactionsReq(query) {
  const requestURL = `${env.API_URL}/transactions`;

  const options = {
    method: 'GET',
    params: query,
  };

  return request(requestURL, options);
}

export function updateTransactionReq(transactionId, data) {
  const requestURL = `${env.API_URL}/transactions/${transactionId}`;

  const options = {
    method: 'PUT',
    body: data,
  };

  return request(requestURL, options);
}
