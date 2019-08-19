import { createSelector } from 'reselect/es';
import { KEY_APP } from 'containers/ChangePasswordPage/constants';

/**
 * Direct selector to the changePassowrdPage state domain
 */
const selectChangePassowrdPageDomain = (state) => state.get(KEY_APP);

/**
 * Other specific selectors
 */


/**
 * Default selector used by ChangePasswordPage
 */

const makeSelectChangePassowrdPage = () => createSelector(
  selectChangePassowrdPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectChangePassowrdPage;
export {
  selectChangePassowrdPageDomain,
};
