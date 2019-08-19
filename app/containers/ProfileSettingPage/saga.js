import { Intent } from '@blueprintjs/core';
import { LOCATION_CHANGE } from 'react-router-redux';
import { SET_USER_INFO } from 'containers/App/actions';
import { CommonToaster } from 'components/CommonToaster';
import { call, fork, take, takeLatest, put, all } from 'redux-saga/effects';
import { getUserInfo, submitUpdateProfileSetting } from 'services/profileSetting.service';
import { DEFAULT_ACTION, PROFILE_SETTING_LOADED, PROFILE_SETTING_UPDATE } from './constants';
import auth from '../../utils/auth';

export function* onInitData(action) {
  try {
    const response = yield call(getUserInfo);
    if (response.success) {
      yield put({ type: PROFILE_SETTING_LOADED, data: response.data });
    }
  } catch (error) {
    action.cbError(error.response);
  }
}

export function* onSubmitUpdateProfileSetting(action) {
  try {
    const response = yield call(submitUpdateProfileSetting, action.data);
    if (response.success) {
      CommonToaster.show({
        message: 'Update profile setting successfully',
        intent: Intent.SUCCESS,
      });
      yield all([
        call(auth.setToken, response.token, true),
        call(auth.setUserInfo, response.user, true),
      ]);
      yield put({ type: SET_USER_INFO, data: response.user });
    }
  } catch (error) {
    action.cbError(error.response);
  }
}

export default function* defaultSaga() {
  yield fork(takeLatest, DEFAULT_ACTION, onInitData);
  yield fork(takeLatest, PROFILE_SETTING_UPDATE, onSubmitUpdateProfileSetting);
  yield take(LOCATION_CHANGE);
}
