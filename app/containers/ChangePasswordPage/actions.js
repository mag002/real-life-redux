/*
 *
 * ChangePasswordPage actions
 *
 */

import {
  SUBMIT,
} from './constants';

export function submit(data, callbackError, callbackSuccess) {
  return {
    type: SUBMIT, data, callbackError, callbackSuccess,
  };
}
