/*
 *
 * FavoritePage reducer
 *
 */

import { fromJS } from 'immutable';
import { LOAD_FAVORITE_DEALS_SUCCESSFULLY } from './constants';

const initialState = fromJS({
  data: {
    docs: [],
    total: 0,
  },
  dealId: null,
});

function favoriteDealReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FAVORITE_DEALS_SUCCESSFULLY:
      return state.set('data', action.data);
    // case REMOVE_SUCCESSFULLY:
    //   return state.set('dealId', action.dealId);
    default:
      return state;
  }
}

export default favoriteDealReducer;
