import { SUBMIT } from './constants';
import { LOCATION_CHANGE } from 'react-router-redux';
import { submitChangePassword } from 'services/profileSetting.service';
import { call, fork, take, takeLatest } from 'redux-saga/effects';
import { CommonToaster } from 'components/CommonToaster';
import { Intent } from '@blueprintjs/core';

export function* onSubmitChangePassword(action) {
  try {
    const response = yield call(submitChangePassword, action.data);
    if (response.success) {
      CommonToaster.show({
        message: 'Change password successfully',
        intent: Intent.SUCCESS,
      });
      action.callbackSuccess();
    }
  } catch (error) {
    action.callbackError(error.response);
  }
}

export default function* defaultSaga() {
  yield fork(takeLatest, SUBMIT, onSubmitChangePassword);
  yield take(LOCATION_CHANGE);
}
