import { LOCATION_CHANGE } from 'react-router-redux';
import { call, fork, take, takeLatest } from 'redux-saga/effects';
import { uploadAvatar } from 'services/auth.service';
import { UPLOAD_AVATAR } from './constants';

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
  } catch (e) {
    console.log('Error when upload avatar', e);
  }
}

export default function* defaultSaga() {
  yield fork(takeLatest, UPLOAD_AVATAR, onUploadAvatar);
  yield take(LOCATION_CHANGE);
}
