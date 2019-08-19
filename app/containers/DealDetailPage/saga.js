import { take, call, put, fork, takeLatest } from 'redux-saga/effects';
import {
  ON_BEGIN_SUBMIT,
  LOAD_DEAL_DETAIL,
  LOAD_DEAL_DETAIL_SUCCESSFULLY,
  GET_SIMILAR_POST,
  GET_SIMILAR_POST_SUCCESSFULLY,
  ON_CREATE_TRANSACTION,
  ON_CREATE_TRANSACTION_SUCCESSFULLY,
  ON_SUBMIT_FAILED,
  ERROR_CREATE_TRANSACTION,
} from './constants';
import { LOCATION_CHANGE } from 'react-router-redux';
import { getDealAsGuest } from 'services/deal.service';
import logger from '../../logger';
import { createTransactionReq } from 'services/transaction.service';
import { onSearchDealReq } from 'services/search.service';

// Individual exports for testing
export function* loadDealDetail({ slug, buyerId }) {
  try {
    let deal;

    const response = yield call(getDealAsGuest, slug, { buyerId });
    if (response.success) {
      deal = response.deal;
    }

    yield put({ type: LOAD_DEAL_DETAIL_SUCCESSFULLY, deal });
  } catch (e) {
    logger.error(e);
  }
}

export function* getSimilarPost({ params }) {
  try {
    let deals = [];

    const response = yield call(onSearchDealReq, params);

    if (response.success) {
      deals = response.deals;
    }

    yield put({ type: GET_SIMILAR_POST_SUCCESSFULLY, deals });
  } catch (e) {
    logger(e);
  }
}

export function* onCreateTransaction({ dealId }) {
  try {
    yield put({ type: ON_BEGIN_SUBMIT });

    let response = yield call(createTransactionReq, { dealId });

    if (response.success) {
      let { transaction } = response;

      yield put({ type: ON_CREATE_TRANSACTION_SUCCESSFULLY, transaction });
    } else {
      yield put({ type: ON_SUBMIT_FAILED, errorCode: ERROR_CREATE_TRANSACTION });
    }
  } catch (e) {
    logger(e);
    yield put({ type: ON_SUBMIT_FAILED });
  }
}

export default function* defaultSaga() {
  yield fork(takeLatest, LOAD_DEAL_DETAIL, loadDealDetail);
  yield fork(takeLatest, GET_SIMILAR_POST, getSimilarPost);
  yield fork(takeLatest, ON_CREATE_TRANSACTION, onCreateTransaction);
  yield take(LOCATION_CHANGE);
}
