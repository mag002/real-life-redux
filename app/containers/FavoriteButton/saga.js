import { take, call, put, select, fork, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { ADD_OR_REMOVE, ADD, REMOVE } from './constants';
import * as favoriteItemServices from '../../services/favoriteDeal.service';
import logger from 'logger';

export function* addOrRemove({ dealId, added, callbackSuccess, callbackError }) {
  try {
    const type = added ? REMOVE : ADD;
    const response = yield call(favoriteItemServices.addOrRemove, dealId, type);
    console.log(response);
    if (response.success) {
      callbackSuccess();
    } else {
      callbackError(response.error);
    }
  } catch (e) {
    logger.error(e);
    callbackError(e.response.payload.error);
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield fork(takeLatest, ADD_OR_REMOVE, addOrRemove);
  yield take(LOCATION_CHANGE);
}
