import { fromJS, Map } from 'immutable';
import {
} from './constants';

const initialState = fromJS({

});

function searchPageReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default searchPageReducer;
