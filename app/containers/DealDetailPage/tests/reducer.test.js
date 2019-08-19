
import { fromJS } from 'immutable';
import dealDetailPageReducer from '../reducer';

describe('dealDetailPageReducer', () => {
  it('returns the initial state', () => {
    expect(dealDetailPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
