/*
 *
 * Pages actions
 *
 */

import { UPLOAD_AVATAR } from './constants';

export function uploadAvatar(file, cbSuccess) {
  return {
    type: UPLOAD_AVATAR,
    file,
    cbSuccess,
  };
}
