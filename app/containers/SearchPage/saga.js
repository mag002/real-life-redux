import { LOCATION_CHANGE } from 'react-router-redux';
import { call, put, fork, take, takeLatest, select } from 'redux-saga/effects';

export default function* defaultSaga() {
  yield take(LOCATION_CHANGE);
}
