/*
 *
 * DealDetailPage actions
 *
 */

import {
  LOAD_DEAL_DETAIL,
  GET_SIMILAR_POST,
  ON_CREATE_TRANSACTION,
} from './constants';

export function loadDealDetail(slug, buyerId = null) {
  return {
    type: LOAD_DEAL_DETAIL,
    slug,
    buyerId,
  };
}

export function getSimilarPost(params = {}) {
  return {
    type: GET_SIMILAR_POST,
    params,
  };
}

export function onCreateTransaction(dealId) {
  return {
    type: ON_CREATE_TRANSACTION,
    dealId,
  };
}
