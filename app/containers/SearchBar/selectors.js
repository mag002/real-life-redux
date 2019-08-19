import { createSelector } from 'reselect/es';

const selectSearchBarDomain = (state) => state.get('searchBar');

/**
 * Other specific selectors
 */
// const makeSelectFormType = () => createSelector(
//   selectAuthPageDomain,
//   (substate) => substate.get('formType'),
// );
//
const makeSelectSearchData = () => createSelector(
  selectSearchBarDomain,
  (substate) => substate.get('searchData').toJS(),
);

/**
 * Default selector used by AuthPage
 */

const makeSelectSearchBar = () => createSelector(
  selectSearchBarDomain,
  (substate) => substate.toJS()
);

export default makeSelectSearchBar;
export {
  makeSelectSearchBar,
  makeSelectSearchData,
};
