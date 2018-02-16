import React from 'react';
import { shallow } from "../../testRender";
import { stub, assert } from "sinon";
import Shelf from "./Shelf";


describe('Shelf', () => {

  const renderedShelf = shallow(Shelf);
  const stubChangeBookStatus = stub().resolves({});
  const bookList = [
    { id: 1, title: 'TITLE 1', subtitle: 'SUBTITLE 1' },
    { id: 2, title: 'TITLE 2', subtitle: 'SUBTITLE 2' },
    { id: 3, title: 'TITLE 3', subtitle: 'SUBTITLE 3' }
  ];
  const title = 'Shelf Title'
  const shelfId = 'read'
  const rendersDefaultShelf = (prop) => renderedShelf.withProps(
    {
      bookList,
      title,
      changeBookStatus: stubChangeBookStatus,
      shelfId,
      ...prop
    }
  )

  beforeEach(() => {
    stubChangeBookStatus.resetHistory();
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

  test('renders at least one bookList', () => {
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

  test('renders a NoResult container if books array is empty', () => {
    const wrapper = rendersDefaultShelf({bookList:[]})
    , actual = wrapper.find('NoResults').length
    , expected = 1;

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

      test('which adds a book to selectedBooksArray if value is truthy', () => {
        const wrapper = rendersDefaultShelf()
        , SELECTED = true
        , handleBookSelectionFunction = wrapper.instance().handleBookSelection
        , bookToSelect = bookList[0]
        let stateAfterSelectionHandled
        , selectedBooksAfter;

        wrapper.setState({selectedBooks:[]})

        handleBookSelectionFunction(bookToSelect, SELECTED);
        
        stateAfterSelectionHandled = wrapper.instance().state;
        selectedBooksAfter = stateAfterSelectionHandled.selectedBooks;

        expect(selectedBooksAfter).toContainEqual(bookToSelect)
      })

      test('which removes a book of selectedBooksArray if value is falsy', () => {
        const wrapper = rendersDefaultShelf()
        , NOT_SELECTED = false
        , handleBookSelectionFunction = wrapper.instance().handleBookSelection
        , bookPreviouslyAdded = bookList[0]
        let stateAfterSelectionHandled
        , selectedBooksAfter;

        wrapper.setState({selectedBooks:[bookPreviouslyAdded]})

        handleBookSelectionFunction(bookPreviouslyAdded, NOT_SELECTED);
        
        stateAfterSelectionHandled = wrapper.instance().state;
        selectedBooksAfter = stateAfterSelectionHandled.selectedBooks;

        expect(selectedBooksAfter).not.toContainEqual(bookPreviouslyAdded)
      })
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

      assert.calledWith(stubChangeBookStatus, book, shelf);

    });

    test('changeSelectedBookStatus which update books to the selected shelf in ManageMenu', () => {
      const wrapper = rendersDefaultShelf()
        , stubonOnFinishExecutingPromises = stub(wrapper.instance(), 'onFinishExecutingPromises')
        , extractedChangeSelectedBookStatus = wrapper.instance().changeSelectedBookStatus
        , stubSetState = stub(wrapper.instance(), 'setState')
        , stubCreateBookPromises = stub(wrapper.instance(), 'createBookPromisesArray');

      extractedChangeSelectedBookStatus()

      assert.callOrder(stubCreateBookPromises, stubSetState, stubonOnFinishExecutingPromises);

    });

  });


})