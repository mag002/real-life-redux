import { fromJS, Map } from 'immutable';
import {
  GET_MY_DEALS_SUCCESSFULLY,
  ON_DELETE_DEAL_SUCCESSFULLY,
  ON_UPDATE_DEAL_SUCCESSFULLY,
  GET_BRANDS_SUCCESSFULLY,
} from './constants';

const initialState = fromJS({
  actionType: null,
  actionSuccess: false,
  deals: {},
  brands: [],
});

function dealsPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MY_DEALS_SUCCESSFULLY:
      return state.set('deals', action.deals)
        .set('actionType', action.type)
        .set('actionSuccess', action.success);
    case ON_DELETE_DEAL_SUCCESSFULLY:
      return state.set('actionType', action.type)
        .set('actionSuccess', action.success);
    case ON_UPDATE_DEAL_SUCCESSFULLY:
      return state.set('actionType', action.type)
        .set('actionSuccess', action.success);
    case GET_BRANDS_SUCCESSFULLY:
      return state.set('brands', action.brands);
    default:
      return state;
  }
}

export default dealsPageReducer;
