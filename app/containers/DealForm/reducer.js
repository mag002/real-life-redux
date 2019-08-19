import { fromJS, Map } from 'immutable';
import {
  ERROR_COMMON,
  ON_BEGIN_SUBMIT,
  ON_SUBMIT_FAILED,
  ON_SUBMIT_SUCCESSFULLY,
  GET_BRANDS_SUCCESSFULLY,
  GET_DEAL_SUCCESSFULLY,
  ON_UPLOAD_IMAGE_SUCCESSFULLY,
} from './constants';

const initialState = fromJS({
  actionType: null,
  deal: null,
  brands: null,
  urls: null,
});

function dealsPageReducer(state = initialState, action) {
  switch (action.type) {
    case ON_BEGIN_SUBMIT:
      return state.set('errorCode', null);
    case ON_SUBMIT_FAILED:
      return state.set('errorCode', action.errorCode || ERROR_COMMON);
    case ON_SUBMIT_SUCCESSFULLY:
      return state.set('actionType', action.type).set('deal', action.deal);
    case GET_BRANDS_SUCCESSFULLY:
      return state.set('brands', action.brands);
    case GET_DEAL_SUCCESSFULLY:
      return state.set('actionType', action.type).set('deal', action.deal);
    case ON_UPLOAD_IMAGE_SUCCESSFULLY:
      return state.set('urls', action.urls);

    default:
      return state;
  }
}

export default dealsPageReducer;
