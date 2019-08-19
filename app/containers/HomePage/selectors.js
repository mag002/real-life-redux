import { createSelector } from 'reselect/es';

const selectHomePageDomain = (state) => state.get('homePage');

/**
 * Other specific selectors
 */
// const makeSelectFormType = () => createSelector(
//   selectAuthPageDomain,
//   (substate) => substate.get('formType'),
// );
//
// const makeSelectModifiedData = () => createSelector(
//   selectAuthPageDomain,
//   (substate) => substate.get('modifiedData').toJS(),
// );

/**
 * Default selector used by AuthPage
 */

const makeSelectHomePage = () => createSelector(
  selectHomePageDomain,
  (substate) => substate.toJS()
);

export default makeSelectHomePage;
export {
  makeSelectHomePage,
};
