import {
  ON_CHANGE,
} from './constants';

export function onChange(key, value) {
  return {
    type: ON_CHANGE,
    key,
    value,
  };
}
