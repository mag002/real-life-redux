import {
  ON_SUBMIT,
  GET_BRANDS,
  GET_DEAL,
  ON_UPLOAD_IMAGE,
} from './constants';

export function onSubmit(deal) {
  return {
    type: ON_SUBMIT,
    deal,
  };
}

export function getBrands() {
  return {
    type: GET_BRANDS,
  };
}

export function getTypes() {
  return {
    type: GET_BRANDS,
  };
}

export function getDeal(dealId) {
  return {
    type: GET_DEAL,
    dealId,
  };
}

export function onUploadImage(files) {
  return {
    type: ON_UPLOAD_IMAGE,
    files,
  };
}
