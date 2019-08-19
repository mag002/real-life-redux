/*
 *
 * ProfileSettingPage actions
 *
 */

import {
  DEFAULT_ACTION, PROFILE_SETTING_UPDATE,
} from './constants';

export function defaultAction(cbError) {
  return {
    type: DEFAULT_ACTION, cbError,
  };
}
export function updateProfileSetting(data, cbError, cbSuccess) {
  return {
    type: PROFILE_SETTING_UPDATE, data, cbError, cbSuccess,
  };
}
