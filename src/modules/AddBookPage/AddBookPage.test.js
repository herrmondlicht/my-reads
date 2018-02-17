import { shallow } from "../../testRender";
import AddBookPage from "../AddBookPage";
import { assert, stub, createStubInstance } from "sinon";
import * as OriginalBooksAPI from '../../utils/BooksAPI';


describe('AddBookPage', () => {
  const BooksAPI = stub(OriginalBooksAPI)
  , loadedBooks = [
    
  ]
    , renderTest = (props) => shallow(AddBookPage).withProps({ ...props, BooksAPI })
  test('must be a function', () => {
    expect(typeof AddBookPage).toBe('function')
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

  describe('must have a FlagBooksShelves', () => {

    test('that updates the result from search with the data from loadedBooks', () => {

    })

  })
})