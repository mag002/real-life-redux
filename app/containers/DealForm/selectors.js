import { createSelector } from 'reselect/es';
import { DEAL_FORM } from './constants';

const selectDealFormDomain = (state) => state.get(DEAL_FORM);

/**
 * Default selector used by AuthPage
 */

const makeSelectDealForm = () => createSelector(
  selectDealFormDomain,
  (substate) => substate.toJS()
);

export default makeSelectDealForm;
export {
  makeSelectDealForm,
};
