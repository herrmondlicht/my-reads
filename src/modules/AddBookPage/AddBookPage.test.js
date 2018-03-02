import { shallow } from "../../testRender";
import AddBookPage from "../AddBookPage";
import { assert, stub, createStubInstance } from "sinon";
import * as OriginalBooksAPI from '../../utils/BooksAPI';


describe('AddBookPage', () => {
  const BooksAPI = stub(OriginalBooksAPI)
    , loadedBooks = [
      { id: 1, title: 'TITLE 1', subtitle: 'SUBTITLE 1', shelf: 'old' },
      { id: 2, title: 'TITLE 2', subtitle: 'SUBTITLE 2', shelf: 'old' },
      { id: 3, title: 'TITLE 3', subtitle: 'SUBTITLE 3', shelf: 'old' }
    ]
    , renderTest = (props) => shallow(AddBookPage).withProps({ ...props, BooksAPI, books: loadedBooks })

  test('must be a function', () => {
    expect(typeof AddBookPage).toBe('function')
  });

  test('must return a function', () => {
    const wrapper = renderTest()
      , actual = wrapper.find('CustomAppBar').length
      , expected = 1;
    expect(actual).toBe(expected)
  });

  test('must render a SearchBar', () => {
    const wrapper = renderTest()
      , actual = wrapper.find('SearchBar').length
      , expected = 1
    expect(actual).toBe(expected);
  });

  test('must render a Shelf', () => {
    const wrapper = renderTest()
      , actual = wrapper.find('Shelf').length
      , expected = 1
    expect(actual).toBe(expected);
  })

  test('must have a initizalized state', () => {
    const wrapper = renderTest()
      , actualState = wrapper.instance().state
      , expectedState = {
        bookList: [],
      }

    expect(actualState).toEqual(expectedState)
  });

  describe('must have a HandleSearch method', () => {
    const correctText = 'text to search'
      , wrongText = 'text that errors'
      , promiseReturnedBooks = [
        { id: 1, title: 'test' },
        { id: 2, title: 'test' }
      ]
    BooksAPI.search = stub().rejects({ 'error': 'error' })
    BooksAPI.search.withArgs(correctText).resolves(promiseReturnedBooks)


    test('that searches for a text in API and fills the bookList if successful', async () => {
      const wrapper = renderTest()
        , instance = wrapper.instance()
        , HandleSearchFunction = instance.HandleSearch
        , expectedState = { bookList: promiseReturnedBooks }
      let stateAfterSearch;

      await HandleSearchFunction(correctText)

      stateAfterSearch = wrapper.state()
      expect(stateAfterSearch).toEqual(expectedState)
    });

    test('that searches for a text in API and fills the bookList with empty array if fails', async () => {
      const wrapper = renderTest()
        , instance = wrapper.instance()
        , HandleSearchFunction = instance.HandleSearch
        , expectedState = { bookList: [] }
      let stateAfterSearch;

      await HandleSearchFunction(wrongText)

      stateAfterSearch = wrapper.state()
      expect(stateAfterSearch).toEqual(expectedState)
    })
  })

  //TODO: AddBook and updateBookList 

  describe('must have a GetBooksWithShelfFlag', () => {

    test('that updates the result from search with the data from loadedBooks', () => {
      const wrapper = renderTest()
        , booksGotFromSearch = [
          { id: 1, title: 'TITLE 1', subtitle: 'SUBTITLE 1' },
          { id: 2, title: 'TITLE 2', subtitle: 'SUBTITLE 2' },
          { id: 3, title: 'TITLE 3', subtitle: 'SUBTITLE 3' }
        ]
        , GetBooksWithShelfFlagFunction = wrapper.instance().GetBooksWithShelfFlag

      wrapper.setState({ bookList: booksGotFromSearch })

      const arrayWithFlaggedBooks = GetBooksWithShelfFlagFunction()

      expect(arrayWithFlaggedBooks).toEqual(loadedBooks)

    })

  })

  describe('must have a AddBook method', () => {
    BooksAPI.update = stub().resolves({})
    beforeEach(() => {
      BooksAPI.update.resetHistory()
    })
    test('that adds a book to the user\'s shelf and updates the bookList', async () => {
      const wrapper = renderTest()
        , instance = wrapper.instance()
        , stubUpdateBookList = stub(instance, 'UpdateBookList')
        , addBookFunction = instance.AddBook
        , bookToBeAdded = {
          id: 1,
          title: 'TITLE 1',
          subtitle: 'SUBTITLE 1',
          shelf: 'oldShelf'
        }
        , newShelf = 'newShelf'

      await addBookFunction(bookToBeAdded, newShelf)

      assert.calledWith(BooksAPI.update, bookToBeAdded, newShelf)
      assert.calledWith(stubUpdateBookList, bookToBeAdded, newShelf)

    })
  })

  describe('must have a UpdateBookList method', () => {

    test('that updates the selected search result book shelf', () => {
      const wrapper = renderTest()
        , instance = wrapper.instance()
        , bookAlreadyOnShelf = {
          id: 1,
          title: 'TITLE 1',
          subtitle: 'SUBTITLE 1',
          shelf: 'oldShelf'
        }
        , updateBookListFunction = instance.UpdateBookList
        , newShelf = 'newShelf'

      wrapper.setState({
        bookList: [bookAlreadyOnShelf]
      })
      const stubSetState = stub(instance, 'setState')

      updateBookListFunction(bookAlreadyOnShelf, newShelf)

      const expected = {
        bookList: [{
          ...bookAlreadyOnShelf,
          shelf: newShelf,
        }]
      }
      assert.calledWith(stubSetState, expected)
    })
  })
})