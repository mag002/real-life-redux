import { fromJS, Map } from 'immutable';
import {
  ON_BEGIN_SUBMIT,
  ON_SUBMIT_FAILED,
  ERROR_COMMON,
  GET_TRANSACTIONS_SUCCESSFULLY,
  ON_UPDATE_TRANSACTION_SUCCESSFULLY,
} from './constants';

const initialState = fromJS({
  errorCode: null,
  transaction: null,
  transactions: {
    docs: [],
    total: 0,
  },
});

function transactionPageReducer(state = initialState, action) {
  switch (action.type) {
    case ON_BEGIN_SUBMIT:
      return state.set('errorCode', null);
    case ON_SUBMIT_FAILED:
      return state.set('errorCode', action.errorCode || ERROR_COMMON);
    case GET_TRANSACTIONS_SUCCESSFULLY:
      return state.set('transactions', action.transactions);
    case ON_UPDATE_TRANSACTION_SUCCESSFULLY:
      return state.set('transaction', action.transaction);
    default:
      return state;
  }
}

export default transactionPageReducer;
