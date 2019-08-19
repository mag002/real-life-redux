
import { fromJS } from 'immutable';
import changePassowrdPageReducer from '../reducer';

describe('changePassowrdPageReducer', () => {
  it('returns the initial state', () => {
    expect(changePassowrdPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
