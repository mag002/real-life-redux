import { createSelector } from 'reselect/es';

const selectGlobal = (state) => state.get('global');

const makeSelectUserInfo = () =>
    createSelector(
        selectGlobal,
        (globalState) => globalState.get('userInfo')
    );
export {
    selectGlobal,
    makeSelectUserInfo,
};
