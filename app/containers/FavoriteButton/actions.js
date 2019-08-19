/*
 *
 * FavoriteButton actions
 *
 */

import { ADD_OR_REMOVE } from './constants';

export function addOrRemove(dealId, added, callbackSuccess, callbackError) {
  return {
    type: ADD_OR_REMOVE,
    dealId,
    added,
    callbackSuccess,
    callbackError,
  };
}
