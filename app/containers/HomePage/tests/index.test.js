import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import React from 'react';

import HomePage from '../index';


describe('<HomePage />', () => {
  it('should render <Link>link</Link>', () => {
    const renderedComponent = shallow(<HomePage />);

    expect(renderedComponent.contains(<Link to={'/${Math.random}'}>link</Link>)).toEqual(true);
  });
});
