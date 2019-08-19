
import { fromJS } from 'immutable';
import profileSettingPageReducer from '../reducer';

describe('profileSettingPageReducer', () => {
  it('returns the initial state', () => {
    expect(profileSettingPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
