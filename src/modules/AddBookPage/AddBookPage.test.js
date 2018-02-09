import { shallow } from "../../testRender";
import AddBookPage from "../AddBookPage";
import { assert, stub } from "sinon";

describe('AddBookPage', () => {
  it('must be a function', () => {
    expect(typeof AddBookPage).toBe('function')
  });

  it('must render a SearchBar', () => {
    const wrapper = shallow(AddBookPage).withProps({})
    , actual = wrapper.find('SearchBar').length
    , expected = 1
    expect(actual).toBe(expected);
  });

  it('must render a Shelf', () => {
    const wrapper = shallow(AddBookPage).withProps({})
    , actual = wrapper.find('Shelf').length
    , expected = 1
    expect(actual).toBe(expected);
  })
})