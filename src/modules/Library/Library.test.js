import React from 'react';
import { shallow } from "../../testRender";
import Library from './Library';
import { assert, stub, createStubInstance } from "sinon";
import ShelvesData from "../../utils/Shelves";
import * as BooksAPI from "../../utils/BooksAPI";

const getMockValues = () => ({
  getAll: stub().returns({ then: stub().resolves() }),
  update: stub().resolves({})
})

describe('Library', () => {
  let MockBooksAPI = getMockValues();
  const renderedLibrary = (props) => shallow(Library).withProps({ ...props, BooksAPI: MockBooksAPI })

  beforeEach(() => {
    MockBooksAPI = getMockValues()
  })

  test('must return a function', () => {
    expect(typeof Library).toBe('function');
  });

  test('must render at least one shelf if has books', () => {
    const books = [
      { title: 'TEST', subtitle: 'subTest', id: 1, shelf: 'currentlyReading' },
      { title: 'TEST', subtitle: 'subTest', id: 2, shelf: 'read' },
      { title: 'TEST', subtitle: 'subTest', id: 3, shelf: 'wantToRead' }
    ]
      , wrapper = renderedLibrary()
      , expected = 1;
    let actual;


    actual = wrapper.find('Shelf').length;

    expect(actual).toBeGreaterThanOrEqual(expected);

  });

  test('must render the shelf with the correct props', () => {
    const books = [
      { title: 'TEST', subtitle: 'subTest', id: 1, shelf: 'currentlyReading' },
      { title: 'TEST', subtitle: 'subTest', id: 2, shelf: 'currentlyReading' },
      { title: 'TEST', subtitle: 'subTest', id: 3, shelf: 'currentlyReading' }
    ]
      , wrapper = renderedLibrary()
      , requiredProps = ['bookList', 'title', 'shelfId', 'changeBookStatus']
    let shelfProps;
    wrapper.setState({ books });
    shelfProps = wrapper.find('Shelf[shelfId="currentlyReading"]').props();

    requiredProps.map(prop => {
      expect(shelfProps).toHaveProperty(prop)
    })

  })

  describe('has the getBooksFromShelf function', () => {
    const books = [
      { title: 'TEST', subtitle: 'subTest', id: 1, shelf: 'currentlyReading' },
      { title: 'TEST', subtitle: 'subTest', id: 2, shelf: 'read' },
      { title: 'TEST', subtitle: 'subTest', id: 3, shelf: 'wantToRead' }
    ]
    test('which must return the correct books based on the passed parameter', () => {
      const expected = books[0]
        , wrapper = renderedLibrary()
        , getBooksFromShelfFunction = wrapper.instance().getBooksFromShelf
        , selectedShelf = ShelvesData[0];

      wrapper.setState({
        books
      });

      const actual = getBooksFromShelfFunction('currentlyReading')

      expect(actual).toContain(expected);

    });
  })

  describe('has the getAllBooks function', () => {
    test('which must call the booksAPI getAll Method', () => {
      const wrapper = renderedLibrary()
        , getAllBooksFunction = wrapper.instance().getAllBooks;

      MockBooksAPI.getAll.resetHistory();

      getAllBooksFunction();

      assert.calledOnce(MockBooksAPI.getAll)
    });
  });

  describe('has the changeBookStatus function', async () => {
    const wrapper = renderedLibrary()
      , updateStateBook = stub(wrapper.instance(), 'updateStateBook')
      , changeBookStatusFunction = wrapper.instance().changeBookStatus
      , book = new Object()
      , shelf = 'currentlyReading'

    await changeBookStatusFunction(book, shelf);

    test('which must call updateStateBook after changeBookStatus response', () => {
      assert.callOrder(MockBooksAPI.update, updateStateBook)
    })
    test('which must call the booksAPI update Method with correct params', async () => {
      assert.calledWith(MockBooksAPI.update, book, shelf)
    });
  });

  describe('has the updateStateBook function', async () => {

    test('which must call the setState', () => {
      const wrapper = renderedLibrary()
        , stubSetState = stub(wrapper.instance(), 'setState')
      wrapper.instance().updateStateBook();
      assert.called(stubSetState);
    })

    test('which must change the books according to changes', () => {
      const wrapper = renderedLibrary()
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


})