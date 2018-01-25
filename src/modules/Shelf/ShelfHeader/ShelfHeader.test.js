import React from 'react';
import { shallow } from "../../../testRender";
import ShelfHeader from './ShelfHeader';
import { assert, stub } from "sinon";


describe('ShelfHeader', () => {
  const defaultProps = {
    title:'Shelf Title', 
    selectModeOn:false, 
    changeSelectedBookStatus: stub(), 
    selectedValue: stub(), 
    toggleSelectionMode:stub(),
  }
  , renderedShelfHeader = (props) => shallow(ShelfHeader).withProps({...defaultProps, ...props})

  test("must render a ShelfHeader component", () => {
		expect(typeof ShelfHeader).toBe('function')
	});


  test('if has no "select mode on", renders a "selectable icon" with function to trigger multiple book selection', () => {
    const wrapper = renderedShelfHeader()
      , actual = wrapper.find('Toolbar IconButton').prop('onClick')
      , expected = 'function';

    expect(typeof actual).toBe('function');

  });

  test('if has "select mode on" and falsy isFetching, renders a ManageMenu component AND a IconButton', () => {
    const wrapper = renderedShelfHeader({selectModeOn:true});
    const expected = 1;
    let actualManageMenu;
    let actualIconButton;

    actualManageMenu = wrapper.find('ManageMenu').length
    actualIconButton = wrapper.find('IconButton').length
    

    expect(actualManageMenu).toBe(expected);
    expect(actualIconButton).toBe(expected);
  });

  test('if has "select mode on" and truthy isFetching, doesnt render a ManageMenu component', () => {
    const wrapper = renderedShelfHeader({ selectModeOn: false });
    const expected = 0;
    let actual;
    actual = wrapper.find('ManageMenu').length

    expect(actual).toBe(expected);
  });

})