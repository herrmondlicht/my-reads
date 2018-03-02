import CustomAppBar from "../CustomAppBar";
import { stub, assert } from 'sinon'
import { shallow } from "../../testRender";
import React from "react";

describe('CustomAppBar', () => {
  const render = (props) => shallow(CustomAppBar).withProps(props)

  test('must be a function', () => {
    expect(typeof CustomAppBar).toBe('function')
  })

  describe('must have a BackButton function', () => {
    test('which must return an IconButton', () => {
      const wrapper = render({ title: 'title', backIcon: true })
      , BackButton = wrapper.instance().BackButton
      , actual = shallow(BackButton).withProps().find('IconButton').length
      , expected = 1;

      expect(actual).toBe(expected)

    });
  })
})
