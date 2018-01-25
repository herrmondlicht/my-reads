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

  componentDidMount() {
    this.getAllBooks()
  }

  updateBook = (book, shelf) => BooksAPI.update(book, shelf)

  render() {
    const { books } = this.state
    console.log(books)
    return (
      <MuiThemeProvider>
        <div style={{ display: 'block' }}>
          <Shelf
            reloadBooks={this.getAllBooks}
            bookList={books}
            updateBook={this.updateBook}
            title={'Currently Reading'}
            shelfId={'currentlyReading'} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
