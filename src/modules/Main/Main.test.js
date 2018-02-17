import Main from "../Main";
import { stub, assert } from 'sinon'
import { shallow } from "../../testRender";
import * as OriginalBooksAPI from '../../utils/BooksAPI';
import React from "react";

describe('Main', () => {
  const BooksAPI = stub(OriginalBooksAPI)

  BooksAPI.getAllBooks = stub().resolves([])
  BooksAPI.update = stub().resolves()
  BooksAPI.getAll = stub().resolves()

  const renderMain = (props) => shallow(Main).withProps({ BooksAPI, ...props })

  test('must render a function', () => {
    expect(typeof Main).toBe('function');
  })

  test('must render two routes', () => {
    const wrapper = renderMain()
      , actual = wrapper.find('Route').length
      , expected = 2

    expect(actual).toBe(expected);
  })

  test('must have a RouteFor method that get a component out of a function', () => {
    const wrapper = renderMain()
      , RouteForMethod = wrapper.instance().RouteFor
      , PATTERN_TEXT = 'text'
      , componentFunction = () => <div>{PATTERN_TEXT}</div>
      , Component = RouteForMethod(componentFunction)
      , renderedText = shallow(Component).withProps().html()

    expect(renderedText).toContain(PATTERN_TEXT)

  });

  describe('has the changeBookStatus function', async () => {
    const wrapper = renderMain()
      , updateStateBook = stub(wrapper.instance(), 'updateStateBook')
      , changeBookStatusFunction = wrapper.instance().changeBookStatus
      , book = new Object()
      , shelf = 'currentlyReading'

    await changeBookStatusFunction(book, shelf);

    test('which must call updateStateBook after changeBookStatus response', () => {
      assert.callOrder(BooksAPI.update, updateStateBook)
    })
    test('which must call the booksAPI update Method with correct params', async () => {
      assert.calledWith(BooksAPI.update, book, shelf)
    });
  });

  describe('has the updateStateBook function', async () => {

    test('which must call the setState', () => {
      const wrapper = renderMain()
        , stubSetState = stub(wrapper.instance(), 'setState')
      wrapper.instance().updateStateBook();
      assert.called(stubSetState);
    })

    test('which must change the books according to changes', () => {
      const wrapper = renderMain()
        , originalBooksArray = [{ id: 1, shelf: 'currentlyReading' }]
        , newShelf = 'read'
        , changedBooksArray = [{ id: 1, shelf: newShelf }]
        , updateStateBookFunction = wrapper.instance().updateStateBook;
      let actualBooksArray = [];
      wrapper.setState({ books: originalBooksArray });

      updateStateBookFunction(originalBooksArray[0], newShelf);

      actualBooksArray = wrapper.state().books;

      expect(actualBooksArray).toEqual(changedBooksArray)
    })
  });

  describe('has the getAllBooks function', () => {
    test('which must call the booksAPI getAll Method', () => {
      const wrapper = renderMain()
        , getAllBooksFunction = wrapper.instance().getAllBooks;

      BooksAPI.getAll.resetHistory();

      getAllBooksFunction();

      assert.calledOnce(BooksAPI.getAll)
    });
  });

  describe('has the componentDidMount function, that calls getAllBooks', () => {
    const wrapper = renderMain();
    assert.called(BooksAPI.getAll)
  })

})