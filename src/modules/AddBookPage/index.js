import React, { Component } from 'react';
import { func, array, object } from "prop-types";
import SearchBar from "../SearchBar";
import Shelf from "../Shelf/Shelf";

export default class AddBookPage extends Component {

  static propTypes = {
    BooksAPI: object.isRequired,
    books: array.isRequired,
  }

  state = {
    bookList: [],
  }

  HandleSearch = (searchText) => {
    const { BooksAPI } = this.props;
    BooksAPI.search(searchText)
      .then(res => {
        if (res.error) throw res
        this.setState({ bookList: res })
      })
      .catch(res => this.setState({ bookList: [] }))
  }

  AddBook = (book, shelf) =>
    this.props.BooksAPI.update(book, shelf)
      .then(res => this.UpdateBookList(book, shelf))

  UpdateBookList = (book, shelf) => {
    const books = this.state.bookList
      .map(listBook => {
        if (listBook.id === book.id) listBook.shelf = shelf
        return { ...listBook }
      })
    this.setState({
      bookList: books
    })
  }


  GetBooksWithShelfFlag = () => {
    const { books: loadedBooks } = this.props
      , bookListWithLoadedBooks = this.state.bookList.map(book => {
        const foundBook = loadedBooks.find(loadedBook => loadedBook.id === book.id)
        if (!!foundBook) return { ...foundBook }
        return book
      })
    return bookListWithLoadedBooks
  }

  render() {
    const bookListWithFlagged = this.GetBooksWithShelfFlag()
      , { changeBookStatus } = this.props;
    return (
      <div>
        <SearchBar searchFor={this.HandleSearch} />
        <Shelf bookList={bookListWithFlagged}
          changeBookStatus={this.AddBook}
          title={'Results'}
          shelfId={'none'}
        />
      </div>
    )
  }
}