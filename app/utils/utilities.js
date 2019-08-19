import env from '../env';
import defaultImage from 'images/xe.jpg';
import decode from 'jwt-decode';
import { configuration } from '../constants';
export function generateUniqueId(...prefixes) {
  let prefix = '';
  if (prefixes) {
    prefix = prefixes.join('_');
  }
  return prefix + Math.random().toString(36).substr(2, 16);
}

export function toQueryString(params) {
  return Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');
}

export function getImageDeal(url, source = configuration.sourceAWS) {
  return source === configuration.sourceAWS ? `${env.IMAGE_AWS_URL}/${env.BUCKET}/${url}` : `${env.API_OKXE}/${url}`;
}

export function getImageDealFromArray(images, idx) {
  if (images && images.length > 0) {
    const image = images.length > idx ? images[idx] : null;
    if (image) {
      return image.source === configuration.sourceAWS ? `${env.IMAGE_AWS_URL}/${env.BUCKET}/${image.url}` : `${env.API_OKXE}/${image.url}`;
    }
  }
  return defaultImage;
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

export function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate && expirationDate < new Date();
}
