/*
 *
 * FavoriteButton reducer
 *
 */

import { fromJS } from 'immutable';

const initialState = fromJS({});

function favoriteButtonReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default favoriteButtonReducer;
