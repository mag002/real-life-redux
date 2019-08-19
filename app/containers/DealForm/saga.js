import { LOCATION_CHANGE } from 'react-router-redux';
import { call, put, fork, take, takeLatest } from 'redux-saga/effects';
import { createDealReq, getDeal, updateDealReq, uploadImages } from '../../services/deal.service';
import { getBrandsReq } from 'services/search.service';
// import { isEmpty } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import logger from 'logger';

import {
  ON_BEGIN_SUBMIT,
  ON_SUBMIT_FAILED,
  ERROR_SUBMIT_FAIL,
  ERROR_UPLOAD_IMG_FAIL,
  ON_SUBMIT,
  ON_SUBMIT_SUCCESSFULLY,
  GET_BRANDS,
  GET_BRANDS_SUCCESSFULLY,
  GET_DEAL,
  GET_DEAL_SUCCESSFULLY,
  ON_UPLOAD_IMAGE,
  ON_UPLOAD_IMAGE_SUCCESSFULLY,
} from './constants';

export function* onSubmit({ deal }) {
  try {
    yield put({ type: ON_BEGIN_SUBMIT });

    let response;

    // Handle Update
    if (deal.id) {
      response = yield call(updateDealReq, deal.id, deal);
    } else {
      response = yield call(createDealReq, deal);
    }
    if (response.success) {
      let newDeal = response.deal;
      yield put({ type: ON_SUBMIT_SUCCESSFULLY, deal: newDeal });
    } else {
      yield put({ type: ON_SUBMIT_FAILED, errorCode: ERROR_SUBMIT_FAIL });
    }
  } catch (e) {
    logger.error('Error when create deal', e);
    yield put({ type: ON_SUBMIT_FAILED, errorCode: ERROR_SUBMIT_FAIL });
  }
}

export function* getBrands() {
  try {
    yield put({ type: ON_BEGIN_SUBMIT });

    let brands = [];

    const response = yield call(getBrandsReq);

    if (response.success) {
      brands = response.brands;
    }

    yield put({ type: GET_BRANDS_SUCCESSFULLY, brands });
  } catch (e) {
    yield put({ type: ON_SUBMIT_FAILED });
  }
}

export function* getDealDetail({ dealId }) {
  try {
    yield put({ type: ON_BEGIN_SUBMIT });

    let newDeal = null;
    const response = yield call(getDeal, dealId);

    if (response.success) {
      newDeal = response.deal;
      yield put({ type: GET_DEAL_SUCCESSFULLY, deal: newDeal });
    } else {
      yield put({ type: ON_SUBMIT_FAILED, errorCode: ERROR_SUBMIT_FAIL });
    }
  } catch (e) {
    yield put({ type: ON_SUBMIT_FAILED });
  }
}

export function* onUploadImage({ files }) {
  try {
    yield put({ type: ON_BEGIN_SUBMIT });

    const formData = new FormData();

    files.forEach((file) => {
      formData.append('items', file);
    });

    const response = yield call(uploadImages, formData);

    if (response.data.success && !isEmpty(response.data.urls)) {
      yield put({ type: ON_UPLOAD_IMAGE_SUCCESSFULLY, urls: response.data.urls });
    } else {
      yield put({ type: ON_SUBMIT_FAILED, errorCode: ERROR_UPLOAD_IMG_FAIL });
    }
  } catch (e) {
    yield put({ type: ON_SUBMIT_FAILED, errorCode: ERROR_UPLOAD_IMG_FAIL });
  }
}

export default function* defaultSaga() {
  yield fork(takeLatest, ON_SUBMIT, onSubmit);
  yield fork(takeLatest, GET_BRANDS, getBrands);
  yield fork(takeLatest, GET_DEAL, getDealDetail);
  yield fork(takeLatest, ON_UPLOAD_IMAGE, onUploadImage);
  yield take(LOCATION_CHANGE);
}
