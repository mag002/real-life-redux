import { createSelector } from 'reselect/es';
import { KEY_APP } from './constants';

/**
 * Direct selector to the profileSettingPage state domain
 */
const selectProfileSettingPageDomain = (state) => state.get(KEY_APP);

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProfileSettingPage
 */

const makeSelectProfileSettingPage = () => createSelector(
  selectProfileSettingPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectProfileSettingPage;
export {
  selectProfileSettingPageDomain,
};
