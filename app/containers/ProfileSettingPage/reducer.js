/*
 *
 * ProfileSettingPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  PROFILE_SETTING_LOADED,
} from './constants';

const initialState = fromJS({
  user: {},
  locations: [],
});

function profileSettingPageReducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_SETTING_LOADED:
      return state.set('user', action.data.user).set('locations', action.data.locations);
    default:
      return state;
  }
}

export default profileSettingPageReducer;
