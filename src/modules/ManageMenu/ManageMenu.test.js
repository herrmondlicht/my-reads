import React from 'react'
import { shallow } from "../../testRender";
import ManageMenu from '../ManageMenu/ManageMenu';

const renderManageMenu = shallow(ManageMenu);

describe('ManageMenu', () => {

  const changeBookStatus = jest.fn();

  beforeEach(() => {
    changeBookStatus.mockReset()
  })

  test("must return a function", () => {
    expect(typeof ManageMenu).toBe('function');
  });

  test('must have a ManageMenuHeader', () => {
    const wrapper = renderManageMenu.withProps({ changeBookStatus })
      , expected = 1
      , actual = wrapper.find('ManageMenuHeader').length;

    expect(actual).toBe(expected)
  });

  test('must render a Popover component with a onRequestClose', () => {
    const wrapper = renderManageMenu.withProps({ changeBookStatus })
      , popoverFunction = wrapper.find('Popover').prop('onRequestClose');

    expect(typeof popoverFunction).toBe('function')
  });

  test('must render at least one Component inside Popover', () => {
    const wrapper = renderManageMenu.withProps({ changeBookStatus })
      , actual = wrapper.find('Popover').children().length
      , expected = 0;
    expect(actual).toBeGreaterThan(expected);
  });

  describe('has the following methods', () => {

    test('handleButtonClick which opens the popover', () => {
      const wrapper = renderManageMenu.withProps({ changeBookStatus })
        , handleButtonClickFunction = wrapper.instance().handleButtonClick
        , event = {
          preventDefault: jest.fn()
        }
      handleButtonClickFunction(event);

      const popoverStatus = wrapper.state().openedPopover;

      expect(popoverStatus).toEqual(true);
      expect(event.preventDefault).toHaveBeenCalled()

    })

    test('handlePopoverClose which closes the popover', () => {
      const wrapper = renderManageMenu.withProps({ changeBookStatus })
        , handleCloseRequestFunction = wrapper.instance().handleCloseRequest

      wrapper.setState({
        popoverOpened: true,
      });

      handleCloseRequestFunction();

      const popoverStatus = wrapper.state().openedPopover;

      expect(popoverStatus).toEqual(false);

    })
  })




})