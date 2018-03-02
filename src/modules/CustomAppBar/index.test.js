import CustomAppBar from "../CustomAppBar";
import { stub, assert } from 'sinon'
import { shallow } from "../../testRender";
import React from "react";

describe('CustomAppBar', () => {
  const render = (props) => shallow(CustomAppBar).withProps(props)

  test('must be a function', () => {
    expect(typeof CustomAppBar).toBe('function')
  })

  describe('must have a handleBackIconClick', () => {
    test('which must return to the main page when clicked', () => {
      const wrapper = render({ title: 'title', backIcon: true })
      , handleBackIconClick = wrapper.instance().handleBackIconClick
      handleBackIconClick()
    });
  })

  describe('must have a BackButton function', () => {
    test('which must return to the main page when clicked', () => {
      const wrapper = render({ title: 'title', backIcon: true })
      , handleBackIconClick = wrapper.instance().handleBackIconClick
      handleBackIconClick()
    });
  })
})
