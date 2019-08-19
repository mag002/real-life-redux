import { createSelector } from 'reselect';
const selectGlobal = (state) => state.get('global');
const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);
const makeSelectUserInfo = () =>
    createSelector(
        selectGlobal,
        (globalState) => globalState.get('userInfo'),
    );
export {
  makeSelectLocation,
  makeSelectUserInfo,
};
