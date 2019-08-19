import auth from 'utils/auth';
import { LOCATION_CHANGE } from 'react-router-redux';
import { call, put, fork, take, takeLatest, select } from 'redux-saga/effects';

import { onSearchDealReq } from '../../services/search.service';
import {
  GET_DEALS,
  GET_DEALS_SUCCESSFULLY,
} from './constants';

export function* getDeals() {
  try {
    let deals = [];
    const searchData = {};

    if (auth) {
      const userInfo = auth.getUserInfo();
      if (userInfo) {
        searchData.currentUserId = userInfo.id;
      }
    }

    const response = yield call(onSearchDealReq, searchData);

    if (response.success) {
      deals = response.deals;
    }

    yield put({ type: GET_DEALS_SUCCESSFULLY, deals });
  } catch (error) {
    console.log(error.response.payload.message);
  }
}

export default function* defaultSaga() {
  yield fork(takeLatest, GET_DEALS, getDeals);
  yield take(LOCATION_CHANGE);
}
