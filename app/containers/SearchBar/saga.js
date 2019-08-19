import auth from 'utils/auth';
import { LOCATION_CHANGE } from 'react-router-redux';
import { call, put, fork, take, takeLatest, select } from 'redux-saga/effects';
import { makeSelectSearchData } from './selectors';
import { formatQueryParams } from 'utils/request';
import logger from 'logger';
import {
  getBrandsReq,
  onSearchDealReq,
} from '../../services/search.service';
import {
  GET_BRANDS,
  GET_BRANDS_SUCCESSFULLY,
  ON_SEARCH_DEALS,
  ON_SEARCH_DEALS_SUCCESSFULLY,
} from './constants';

export function* getBrands() {
  try {
    let brands = [];

    const response = yield call(getBrandsReq);

    if (response.success) {
      brands = response.brands;
    }

    brands.unshift({
      name: 'All',
      id: 0,
    });

    yield put({ type: GET_BRANDS_SUCCESSFULLY, brands });
  } catch (e) {
    logger(e);
  }
}

export function* onSearchDeals({ params }) {
  try {
    let deals = [];
    let searchData = yield select(makeSelectSearchData());

    // searchData = Object.assign(searchData, params);

    Object.keys(searchData).forEach((key) => {
      if (searchData[key] === null) {
        delete searchData[key];
      }
    });

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

    yield put({ type: ON_SEARCH_DEALS_SUCCESSFULLY, deals });
  } catch (e) {
    logger(e);
  }
}

export default function* defaultSaga() {
  yield fork(takeLatest, GET_BRANDS, getBrands);
  yield fork(takeLatest, ON_SEARCH_DEALS, onSearchDeals);
  yield take(LOCATION_CHANGE);
}
