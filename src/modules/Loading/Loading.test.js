import React from 'react';
import { shallow } from "../../testRender";
import Loading from './Loading';

describe('Loading', () => {
  const renderedLoading = shallow(Loading).withProps();
  it('must return a function', () => {
    expect(typeof Loading).toBe('function');
  });
  it('must render a CircularProgress', () => {
    const actual = renderedLoading.find('CircularProgress').length
      , expected = 1;
    expect(actual).toBe(expected);
  });
});