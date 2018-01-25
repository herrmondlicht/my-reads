import React from 'react';
import { shallow } from "../../testRender";
import { stub, assert } from "sinon";
import Shelf from "./Shelf";


describe('Shelf', () => {

  const renderedShelf = shallow(Shelf);
  const stubUpdateBooks = stub().resolves({});
  const stubReloadBooks = stub().resolves({});
  const bookList = [
    { id: 1, title: 'TITLE 1', subtitle: 'SUBTITLE 1' },
    { id: 2, title: 'TITLE 2', subtitle: 'SUBTITLE 2' },
    { id: 3, title: 'TITLE 3', subtitle: 'SUBTITLE 3' }
  ];
  const title = 'Shelf Title'

  const rendersDefaultShelf = (prop) => renderedShelf.withProps({ bookList, title, updateBook: stubUpdateBooks, reloadBooks: stubReloadBooks, ...prop })

  beforeEach(() => {
    stubUpdateBooks.resetHistory();
    stubReloadBooks.resetHistory();
  })

  test('must return a function', () => {
    expect(typeof Shelf).toBe('function');
  });

  test('renders a shelfHeader', () => {
    const wrapper = rendersDefaultShelf()
      , actual = wrapper.find('ShelfHeader').length
      , expected = 1;
    expect(actual).toBe(expected);
  });

  test('renders a bookList', () => {
    const wrapper = rendersDefaultShelf()
      , actual = wrapper.find('Book').length
      , expected = 1;

    expect(actual).toBeGreaterThan(expected);
  })

  test('renders a Loading if isFetching is true', () => {
    const wrapper = rendersDefaultShelf()
      , expected = 1;
    let actual;
    wrapper.setState({ isFetching: true });
    actual = wrapper.find('Loading').length;
    expect(actual).toBe(expected);
  })

  test('has a state with selectedBooks, selectModeOn, isFetching and booksUpdatePromises', () => {
    const wrapper = rendersDefaultShelf()
      , actualState = wrapper.state()

    expect(actualState).toHaveProperty('selectedBooks');
    expect(actualState).toHaveProperty('selectModeOn');
    expect(actualState).toHaveProperty('booksUpdatePromises');
    expect(actualState).toHaveProperty('isFetching');
  });

  describe('must have the following class methods', () => {

    test('toggleSelectionMode, which allows multi book selection', () => {
      const wrapper = rendersDefaultShelf()
        , extractedToggleSelectionMode = wrapper.instance().toggleSelectionMode;
      let stateAfterToggleSelection = {}

      wrapper.setState({
        selectModeOn: false,
      })

      extractedToggleSelectionMode()

      stateAfterToggleSelection = wrapper.state();
      expect(stateAfterToggleSelection.selectModeOn).toBeTruthy()

    });

    describe('handleBookSelection method', () => {
      test('which calls the state twice to change the selectedBooks array if value passed is true', () => {
        const wrapper = rendersDefaultShelf()
          , SELECTED = true
          , setStateStub = stub(wrapper.instance(), 'setState')
          , handleBookSelectionFunction = wrapper.instance().handleBookSelection
        handleBookSelectionFunction(bookList[0], SELECTED);

        assert.calledTwice(setStateStub);

      });

      test('which calls the state once to change the selectedBooks array if value passed is false', () => {
        const wrapper = rendersDefaultShelf()
          , NOT_SELECTED = false
          , setStateStub = stub(wrapper.instance(), 'setState')
          , handleBookSelectionFunction = wrapper.instance().handleBookSelection
        handleBookSelectionFunction(bookList[0], NOT_SELECTED);

        assert.calledOnce(setStateStub);

      });
    })


    test('createBookPromisesArray, which creates an update promise for each book', () => {
      const wrapper = rendersDefaultShelf()
        , createBookPromisesArrayFunction = wrapper.instance().createBookPromisesArray
      const expected = bookList.length;

      wrapper.setState({
        selectedBooks: bookList,
      })

      const actual = createBookPromisesArrayFunction('shelf').length;

      expect(actual).toBe(expected);

    });

    test('createBookPromise, which creates a promise for a book update by calling updateBook prop', () => {
      const wrapper = rendersDefaultShelf()
        , createBookPromiseFunction = wrapper.instance().createBookPromise
        , book = bookList[0]
        , shelf = 'currentlyReading'
      createBookPromiseFunction(book, shelf);

      assert.calledWith(stubUpdateBooks, book, shelf);

    });

    test('changeSelectedBookStatus which update books to the selected shelf in ManageMenu', () => {
      const wrapper = rendersDefaultShelf()
        , stubExecutePromises = stub(wrapper.instance(), 'executeAllBookPromises')
        , extractedChangeSelectedBookStatus = wrapper.instance().changeSelectedBookStatus
        , stubSetState = stub(wrapper.instance(), 'setState')
        , stubCreateBookPromises = stub(wrapper.instance(), 'createBookPromisesArray');

      extractedChangeSelectedBookStatus()

      assert.callOrder(stubCreateBookPromises, stubSetState, stubExecutePromises);

    });

  });


})