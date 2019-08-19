/*
 *
 * HomePage actions
 *
 */

import {
  GET_DEALS,
} from './constants';

export function getDeals() {
  return {
    type: GET_DEALS,
  };
}
