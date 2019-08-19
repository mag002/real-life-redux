import { fromJS, Map } from 'immutable';
import { configuration } from '../../constants';
import {
  ON_CHANGE,
  GET_BRANDS_SUCCESSFULLY,
  ON_SEARCH_DEALS_SUCCESSFULLY,
} from './constants';

const initialState = fromJS({
  searchData: Map({
    brand: 0,
    model: 0,
    radius: 0,
    lat: configuration.geoLocation.lat,
    lon: configuration.geoLocation.lon,
    address: configuration.geoLocation.address,
  }),
  brands: [],
});

function searchBarReducer(state = initialState, action) {
  switch (action.type) {
    case ON_CHANGE:
      return state.updateIn(['searchData', action.key], () => action.value);
    case GET_BRANDS_SUCCESSFULLY:
      return state.set('brands', action.brands);
    case ON_SEARCH_DEALS_SUCCESSFULLY:
      return state.set('deals', action.deals);
    default:
      return state;
  }
}

export default searchBarReducer;
