import React from 'react'
import { shallow } from "../../../testRender";
import ManageMenuHeader from '../ManageMenuHeader/ManageMenuHeader';
import { stub } from "sinon";

describe('ManageMenuHeader', () => {
  const rendersManageMenuHeader = shallow(ManageMenuHeader);
  test('must return a function', () => {
    expect(typeof ManageMenuHeader).toBe('function')
  });

  test('if receive type "fab" renders a FloatingActionButton with a click function', () => {
    const wrapper = rendersManageMenuHeader.withProps({type:'fab', handleButtonClick: stub()})
    , actualFAB = wrapper.find('FloatingActionButton').prop('onClick')
    , expectedFAB = 'function'
    , actualIconButton = wrapper.find('IconButton').length
    , expectedIconButton = 0;
    expect(typeof actualFAB).toBe(expectedFAB);
    expect(actualIconButton).toBe(expectedIconButton);
  })

  test('if receive type "iconButton" renders a IconButton with a click function', () => {
    const wrapper = rendersManageMenuHeader.withProps({type:'iconButton', handleButtonClick: stub()})
    , actualFAB = wrapper.find('FloatingActionButton').length
    , expectedFAB = 0
    , actualIconButton = wrapper.find('IconButton').prop('onClick')
    , expectedIconButton = 'function';

    expect(actualFAB).toBe(expectedFAB);
    expect(typeof actualIconButton).toBe(expectedIconButton);
  })

})