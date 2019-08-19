/*
 *
 * AuthPage reducer
 *
 */

import { fromJS, Map } from 'immutable';
import { ON_CHANGE, SUBMITED_ERROR, FETCHED_LOCATION, UPLOAD_AVATAR_SUCCESSFULLY, SUBMITED } from './constants';

export const initialState = fromJS({
  formType: 'login',
  modifiedData: Map({}),
  errorStatus: false,
  user: {},
  locations: [],
  avatar: '',
});

function authPageReducer(state = initialState, action) {
  switch (action.type) {
    case ON_CHANGE:
      return state.updateIn(['modifiedData', action.key], () => action.value);
    case FETCHED_LOCATION:
      return state.set('user', action.data.user).set('locations', action.data.locations);
    case SUBMITED:
      return state.set('user', action.user);
    case SUBMITED_ERROR:
      return state.set('errorStatus', true);
    case UPLOAD_AVATAR_SUCCESSFULLY:
      return state.set('avatar', action.url);
    default:
      return state;
  }
}

export default authPageReducer;
