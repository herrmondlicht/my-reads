import React from 'react'
import { shallow } from "../../../testRender";
import StatusList from '../StatusList/StatusList';

const renderStatusList = shallow(StatusList);

describe("Component StatusList", () => {

  const changeBookStatusStub = jest.fn()

  const defaultProps = {
    changeBookStatus: changeBookStatusStub
  }

  beforeEach(() => {
    changeBookStatusStub.mockReset()
  })

  test("must be a function ", () => {
    expect(typeof StatusList).toBe('function')
  });

  test("which must render a component", () => {
    const wrapper = renderStatusList.withProps({ ...defaultProps });
    wrapper.render()
  });

  test("which must render the prop items in a list", () => {
    const menuItems = [
      { label: 'Currently Reading', action: 'currentlyReading' },
      { label: 'Want to Read', action: 'wantToRead' },
      { label: 'Read', action: 'read' },
      { label: 'None', action: '' }
    ];
    const wrapper = renderStatusList.withProps({ ...defaultProps, menuItems });

    menuItems.map((item, index) => {
      expect(wrapper.find('Menu')
        .children()
        .at(index).props().value).toBe(menuItems[index].action);
    });
  });

  test("which must have a book state managing function on menu", () => {
    const propItems = [
      { label: 'Currently Reading', action: 'currently' },
    ]
      , wrapper = renderStatusList.withProps({ ...defaultProps, menuItems: propItems })
      , actual = wrapper.find('Menu').prop('onChange')
    expect(typeof actual).toBe('function');
  });

  test("test the menu changing event", () => {
    const propItems = [
      { label: 'LABEL1', action: 'value1' },
      { label: 'LABEL2', action: 'value2' },
    ]
      , event = {}
      , wrapper = renderStatusList.withProps({ ...defaultProps, menuItems: propItems })
      , MenuItemReceived = wrapper.find('Menu');

    MenuItemReceived.simulate('change', event, 'value2');

    expect(changeBookStatusStub).toBeCalledWith('value2');

  });

  describe('has class methods', () => {
    const closePopoverStub = jest.fn();

    test('has handleMenuChange class method, which must change book status and close the popover', () => {
      const event = {}
      , value = 'currentlyReading'
      , wrapper = renderStatusList.withProps({...defaultProps, closePopover:closePopoverStub})
      , handleMenuChange = wrapper.instance().handleMenuChange;

      handleMenuChange(event,value);

      expect(closePopoverStub).toHaveBeenCalled()

      expect(changeBookStatusStub).toHaveBeenCalled()

    });
  })

});