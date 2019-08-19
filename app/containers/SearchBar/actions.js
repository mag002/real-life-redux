/*
 *
 * AuthPage actions
 *
 */

import {
  GET_BRANDS,
  ON_CHANGE,
  ON_SEARCH_DEALS,
} from './constants';

export function onChange(key, value) {
  return {
    type: ON_CHANGE,
    key,
    value,
  };
}

export function getBrands() {
  return {
    type: GET_BRANDS,
  };
}

export function onSearchDeals(params = {}) {
  return {
    type: ON_SEARCH_DEALS,
    params,
  };
}

