import { LOCATION_CHANGE } from 'react-router-redux';
import { call, put, fork, take, takeLatest, select } from 'redux-saga/effects';

import {
  ON_BEGIN_SUBMIT,
  ON_SUBMIT_FAILED,
  ERROR_GET_TRANSACTIONS,
  ERROR_UPDATE_TRANSACTION,
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_SUCCESSFULLY,
  ON_UPDATE_TRANSACTION,
  ON_UPDATE_TRANSACTION_SUCCESSFULLY,
} from './constants';
import { getTransactionsReq, updateTransactionReq } from 'services/transaction.service';
import logger from '../../logger';

export function* getTransactions({ dataPagination }) {
  try {
    yield put({ type: ON_BEGIN_SUBMIT });

    const response = yield call(getTransactionsReq, dataPagination);

    if (response.success) {
      let { transactions } = response;

      yield put({ type: GET_TRANSACTIONS_SUCCESSFULLY, transactions });
    } else {
      yield put({ type: ON_SUBMIT_FAILED, errorCode: ERROR_GET_TRANSACTIONS });
    }
  } catch (e) {
    logger(e);
    yield put({ type: ON_SUBMIT_FAILED });
  }
}

export function* onUpdateTransaction({ transactionId, data }) {
  try {
    yield put({ type: ON_BEGIN_SUBMIT });

    const response = yield call(updateTransactionReq, transactionId, data);

    if (response.success) {
      let { transaction } = response;

      yield put({ type: ON_UPDATE_TRANSACTION_SUCCESSFULLY, transaction });
    } else {
      yield put({ type: ON_SUBMIT_FAILED, errorCode: ERROR_UPDATE_TRANSACTION });
    }
  } catch (e) {
    logger(e);
    yield put({ type: ON_SUBMIT_FAILED });
  }
}

export default function* defaultSaga() {
  yield fork(takeLatest, GET_TRANSACTIONS, getTransactions);
  yield fork(takeLatest, ON_UPDATE_TRANSACTION, onUpdateTransaction);
  yield take(LOCATION_CHANGE);
}
