/*
 *
 * AuthPage reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  GET_DEALS_SUCCESSFULLY,
} from './constants';

const initialState = fromJS({

});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DEALS_SUCCESSFULLY:
      return state.set('deals', action.deals);
    default:
      return state;
  }
}

export default homePageReducer;
