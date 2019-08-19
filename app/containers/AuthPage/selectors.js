import { createSelector } from 'reselect/es';
import { KEY_APP } from './constants';

/**
 * Direct selector to the profileSettingPage state domain
 */
const selectAuthPageDomain = (state) => state.get(KEY_APP);

const makeSelectAuthPage = () => createSelector(
  selectAuthPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectAuthPage;
export {
  selectAuthPageDomain,
};
