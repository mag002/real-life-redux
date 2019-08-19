import { take, call, put, takeLatest, fork } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_FAVORITE_DEALS } from './constants';
import { get } from '../../services/favoriteDeal.service';
import { loadFavoriteDealsSuccessfully } from './actions';
import logger from '../../logger';

export function* loadFavoriteDeals({ dataPagination, callbackError }) {
  try {
    const response = yield call(get, dataPagination);

    if (response.success) {
      yield put(loadFavoriteDealsSuccessfully(response.data));
    }
  } catch (e) {
    logger.error(e);
    callbackError(e.response.payload.error);
  }
}

// export function* remove({ dealId }) {
//   try {
//     yield call(addOrRemove, dealId, 'REMOVE');
//     yield put({ type: REMOVE_SUCCESSFULLY, dealId });
//   } catch (e) {
//     logger(e);
//   }
// }

export default function* defaultSaga() {
  yield fork(takeLatest, LOAD_FAVORITE_DEALS, loadFavoriteDeals);
  // yield fork(takeLatest, REMOVE, remove);
  yield take(LOCATION_CHANGE);
}
