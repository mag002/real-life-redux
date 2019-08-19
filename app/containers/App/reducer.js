/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import { SET_USER_INFO } from './actions';

// The initial state of the App
const initialState = fromJS({
  userInfo: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_INFO:
      return state.set('userInfo', action.data);
    default:
      return state;
  }
}

export default appReducer;
