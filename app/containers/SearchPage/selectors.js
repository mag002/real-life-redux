import { createSelector } from 'reselect/es';

const selectSearchPageDomain = (state) => state.get('searchPage');

const makeSelectSearchPage = () => createSelector(
  selectSearchPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectSearchPage;
export {
  makeSelectSearchPage,
};
