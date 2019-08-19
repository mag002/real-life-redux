import auth from 'utils/auth';
import { forwardTo } from 'utils/history';
import { userStatus } from 'enums/EUserStatus';
import { LOCATION_CHANGE } from 'react-router-redux';
import { getUserInfo } from 'services/profileSetting.service';
import { all, call, fork, take, takeLatest, put } from 'redux-saga/effects';
import { submitFormAuthPage, submitOTPForm, submitOTPForgotPasswordForm, uploadAvatar } from 'services/auth.service';
import { SUBMIT, SUBMIT_OTP, FORM_TYPE_REGISTER, FORM_TYPE_COMPLETE_PROFILE, SUBMIT_FORGOT_PASSWORD_OTP, FORM_TYPE_LOGIN,
  FETCHED_LOCATION, FETCH_LOCATION, UPLOAD_AVATAR_SUCCESSFULLY, UPLOAD_AVATAR, SUBMITED } from './constants';
import { SET_USER_INFO } from 'containers/App/actions';

export function* submitForm(action) {
  try {
    const response = yield call(submitFormAuthPage, action.formType, action.data);

    if (response.success) {
      if (response.token) {
        // Set the user's credentials
        yield all([
          call(auth.setToken, response.token, action.data.rememberMe),
          call(auth.setUserInfo, response.user, action.data.rememberMe),
        ]);
        yield put({ type: SUBMITED, user: response.user });
        yield put({ type: SET_USER_INFO, data: response.user });
        const cbDataRegister = {
          phone: response.user.phone,
          type: response.user.type,
        };
        action.callbackSuccess(cbDataRegister);
        if (response.user.status === userStatus.INACTIVE) {
          yield call(forwardTo, `/auth/${FORM_TYPE_COMPLETE_PROFILE}`);
        } else if (action.formType === FORM_TYPE_REGISTER) {
          yield call(forwardTo, `/auth/${FORM_TYPE_COMPLETE_PROFILE}`);
        } else {
          yield call(forwardTo, '/');
        }
      } else {
        action.callbackSuccess();
        yield call(forwardTo, `/auth/${FORM_TYPE_LOGIN}`);
      }
    }
  } catch (error) {
    action.callbackError(error.response);
  }
}

export function* submitOTP(action) {
  try {
    yield call(submitOTPForm, action.phone);
  } catch (error) {
    action.callbackError(error.response);
  }
}

export function* submitOTPForgotPassword(action) {
  try {
    yield call(submitOTPForgotPasswordForm, action.phone);
  } catch (error) {
    action.callbackError(error.response);
  }
}

export function* fetchLocation(action) {
  try {
    const response = yield call(getUserInfo);
    if (response.success) {
      yield put({ type: FETCHED_LOCATION, data: response.data });
    }
  } catch (error) {
    action.cbError(error.response);
  }
}

export function* onUploadAvatar(action) {
  try {
    let url = null;

    const formData = new FormData();

    formData.append('avatar', action.file);

    const response = yield call(uploadAvatar, formData);

    if (response.data.success) {
      url = response.data.url ? response.data.url : null;
      if (action.cbSuccess) {
        action.cbSuccess(url);
      }
    }

    yield put({ type: UPLOAD_AVATAR_SUCCESSFULLY, url });
  } catch (e) {
    console.log('Error when upload avatar', e);
  }
}

export default function* defaultSaga() {
  yield fork(takeLatest, SUBMIT, submitForm);
  yield fork(takeLatest, SUBMIT_OTP, submitOTP);
  yield fork(takeLatest, SUBMIT_FORGOT_PASSWORD_OTP, submitOTPForgotPassword);
  yield fork(takeLatest, FETCH_LOCATION, fetchLocation);
  yield fork(takeLatest, UPLOAD_AVATAR, onUploadAvatar);
  yield take(LOCATION_CHANGE);
}
