import React from 'react';
import { shallow } from "../../testRender";
import Library from './Library';
import { assert, stub } from "sinon";


describe('Library' ,() => {
  it('must return a function', () => {
    expect(typeof Library).toBe('function');
  });
  
})