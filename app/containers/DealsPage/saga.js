import { LOCATION_CHANGE } from 'react-router-redux';
import { call, put, fork, take, takeLatest, select } from 'redux-saga/effects';

import {
  GET_MY_DEALS,
  GET_MY_DEALS_SUCCESSFULLY,
  ON_DELETE_DEAL,
  ON_DELETE_DEAL_SUCCESSFULLY,
  ON_UPDATE_DEAL,
  ON_UPDATE_DEAL_SUCCESSFULLY,
  GET_BRANDS,
  GET_BRANDS_SUCCESSFULLY,
} from './constants';
import { getBrandsReq } from 'services/search.service';
import { getMyDealsReq, deleteDealReq, updateDealReq } from 'services/deal.service';
import logger from '../../logger';

export function* getMyDeals({ dataPagination }) {
  let deals = {};

  const response = yield call(getMyDealsReq, dataPagination);

  if (response.success) {
    deals = response.data;
  }

  yield put({ type: GET_MY_DEALS_SUCCESSFULLY, success: response.success, deals });
}

export function* onDeleteDeal({ dealId }) {
  const response = yield call(deleteDealReq, dealId);

  yield put({ type: ON_DELETE_DEAL_SUCCESSFULLY, success: response.success });
}

export function* onUpdateDeal({ dealId, data }) {
  const response = yield call(updateDealReq, dealId, data);

  yield put({ type: ON_UPDATE_DEAL_SUCCESSFULLY, success: response.success });
}

export function* getBrands() {
  try {
    let brands = [];

    const response = yield call(getBrandsReq);

    if (response.success) {
      brands = response.brands;
    }

    brands.unshift({
      value: 0,
      name: 'All',
      id: 0,
    });

    yield put({ type: GET_BRANDS_SUCCESSFULLY, brands });
  } catch (e) {
    logger(e);
  }
}

export default function* defaultSaga() {
  yield fork(takeLatest, GET_MY_DEALS, getMyDeals);
  yield fork(takeLatest, ON_DELETE_DEAL, onDeleteDeal);
  yield fork(takeLatest, ON_UPDATE_DEAL, onUpdateDeal);
  yield fork(takeLatest, GET_BRANDS, getBrands);
  yield take(LOCATION_CHANGE);
}
