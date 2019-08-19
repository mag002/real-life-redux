import {
  GET_MY_DEALS,
  ON_DELETE_DEAL,
  ON_UPDATE_DEAL,
  GET_BRANDS,
} from './constants';

export function getMyDeals(dataPagination) {
  return {
    type: GET_MY_DEALS,
    dataPagination,
  };
}

export function onDeleteDeal(dealId) {
  return {
    type: ON_DELETE_DEAL,
    dealId,
  };
}

export function onUpdateDeal(dealId, data) {
  return {
    type: ON_UPDATE_DEAL,
    dealId,
    data,
  };
}

export function getBrands() {
  return {
    type: GET_BRANDS,
  };
}
