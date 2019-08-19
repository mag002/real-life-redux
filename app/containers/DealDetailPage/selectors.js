import { createSelector } from 'reselect/es';
import { DEAL_DETAIL_PAGE } from './constants';

/**
 * Direct selector to the dealDetailPage state domain
 */
const selectDealDetailPageDomain = (state) => state.get(DEAL_DETAIL_PAGE);

/**
 * Other specific selectors
 */
const makeSelectData = () => createSelector(
  selectDealDetailPageDomain,
  (substate) => substate.get('data')
);

const makeSelectSimilarPosts = () => createSelector(
  selectDealDetailPageDomain,
  (substate) => substate.get('similarPosts')
);


/**
 * Default selector used by DealDetailPage
 */

const makeSelectDealDetailPage = () => createSelector(
  selectDealDetailPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectDealDetailPage;
export {
  makeSelectDealDetailPage,
  makeSelectData,
  makeSelectSimilarPosts,
};
