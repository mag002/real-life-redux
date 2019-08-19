import { createSelector } from 'reselect/es';
import { TRANSACTION_PAGE } from './constants';

const selectDealsPageDomain = (state) => state.get(TRANSACTION_PAGE);

/**
 * Default selector used by AuthPage
 */

const makeSelectTransactionPage = () => createSelector(
  selectDealsPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectTransactionPage;
export {
  makeSelectTransactionPage,
};
