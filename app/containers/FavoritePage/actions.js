/*
 *
 * FavoritePage actions
 *
 */

import {
  LOAD_FAVORITE_DEALS, LOAD_FAVORITE_DEALS_SUCCESSFULLY, REMOVE,
} from './constants';

export function loadFavoriteDeals(dataPagination, callbackError) {
  return {
    type: LOAD_FAVORITE_DEALS,
    dataPagination,
    callbackError,
  };
}

// export function remove(dealId) {
//   return {
//     type: REMOVE,
//     dealId,
//   };
// }


export function loadFavoriteDealsSuccessfully(data) {
  return {
    type: LOAD_FAVORITE_DEALS_SUCCESSFULLY,
    data,
  };
}
