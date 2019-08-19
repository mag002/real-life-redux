/*
 *
 * Page reducer
 *
 */

import { fromJS } from 'immutable';

export const initialState = fromJS({});

function pageReducer(state = initialState, action) {
  switch (action.type) {

    default:
      return state;
  }
}

export default pageReducer;
