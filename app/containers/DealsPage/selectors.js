import { createSelector } from 'reselect/es';
import { DEALS_PAGE } from './constants';

const selectDealsPageDomain = (state) => state.get(DEALS_PAGE);

/**
 * Default selector used by AuthPage
 */

const makeSelectDealsPage = () => createSelector(
  selectDealsPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectDealsPage;
export {
  makeSelectDealsPage,
};
