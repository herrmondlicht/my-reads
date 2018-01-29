import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar'
import Library from './Library'
import Book from './modules/Book/Book';
import Shelf from './modules/Shelf/Shelf';
class App extends Component {

  state = {
    books: [],
  }

  availableBookStatus = [
    "currentlyReading",
    "wantToRead",
    "read",
  ]

  getBooksFromShelf = (shelf) => this.state.books.filter(book => book.shelf === shelf)

  getAllBooks = () => BooksAPI.getAll().then(allBooks => this.setState({ books: allBooks }))

  // getAllBooks = () => BooksAPI.search('a').then(allBooks => this.setState({ books: allBooks }))



  componentDidMount() {
    this.getAllBooks()
  }

  changeBookStatus = (book, shelf) =>
    BooksAPI.update(book, shelf)
      .then(res => this.updateStateBook(book, shelf))

  updateStateBook = (newBookValue, shelf) =>
    this.setState(prevState =>
      prevState.books.map(book =>
        book.id === newBookValue.id && (book.shelf = shelf)
      )
    );


  render() {
    const { books } = this.state
    console.log(books)
    return (
      <MuiThemeProvider>
        <div style={{ display: 'block' }}>
          <Shelf
            bookList={books}
            updateBook={this.changeBookStatus}
            title={'Currently Reading'}
            shelfId={'currentlyReading'} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
