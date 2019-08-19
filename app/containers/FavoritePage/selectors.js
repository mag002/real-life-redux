import { createSelector } from 'reselect';
import { FAVORITE_PAGE } from './constants';

/**
 * Direct selector to the favoriteList state domain
 */
const selectFavoriteDealDomain = (state) => state.get(FAVORITE_PAGE);

/**
 * Other specific selectors
 */
const makeSelectData = () => createSelector(
  selectFavoriteDealDomain,
  (substate) => substate.get('data')
);

const makeSelectDealId = () => createSelector(
  selectFavoriteDealDomain,
  (substate) => substate.get('dealId')
);


/**
 * Default selector used by FavoritePage
 */

const makeSelectFavoriteDeal = () => createSelector(
  selectFavoriteDealDomain,
  (substate) => substate.toJS()
);

export default makeSelectFavoriteDeal;
export {
  selectFavoriteDealDomain,
  makeSelectData,
  makeSelectDealId,
};
