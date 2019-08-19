import {
  GET_TRANSACTIONS,
  ON_UPDATE_TRANSACTION,
} from './constants';

export function getTransactions(dataPagination) {
  return {
    type: GET_TRANSACTIONS,
    dataPagination,
  };
}

export function onUpdateTransaction(transactionId, data) {
  return {
    type: ON_UPDATE_TRANSACTION,
    transactionId,
    data,
  };
}
