/*
 *
 * DealDetailPage reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  ON_BEGIN_SUBMIT,
  ON_SUBMIT_FAILED,
  ERROR_COMMON,
  LOAD_DEAL_DETAIL_SUCCESSFULLY,
  GET_SIMILAR_POST_SUCCESSFULLY,
  ON_CREATE_TRANSACTION_SUCCESSFULLY,
} from './constants';

const initialState = fromJS({
  errorCode: null,
  deal: null,
  similarPosts: {},
  transaction: null,
});

function dealDetailPageReducer(state = initialState, action) {
  switch (action.type) {
    case ON_BEGIN_SUBMIT:
      return state.set('errorCode', null);
    case ON_SUBMIT_FAILED:
      return state.set('errorCode', action.errorCode || ERROR_COMMON);
    case LOAD_DEAL_DETAIL_SUCCESSFULLY:
      return state.set('deal', action.deal);
    case GET_SIMILAR_POST_SUCCESSFULLY:
      return state.set('similarPosts', action.deals);
    case ON_CREATE_TRANSACTION_SUCCESSFULLY:
      return state.set('transaction', action.transaction);
    default:
      return state;
  }
}

export default dealDetailPageReducer;
