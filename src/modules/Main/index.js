import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar'
import AddBookPage from '../AddBookPage'
import Library from '../Library/Library'
import { object } from 'prop-types'

export default class Main extends Component {

  state = {
    books: [],
  }

  static propTypes = {
    BooksAPI: object.isRequired
  }

  RouteFor = (Component) => {
    const { BooksAPI } = this.props;
    const { books } = this.state
    return () =>
      <Component BooksAPI={BooksAPI} books={books} changeBookStatus={this.changeBookStatus} />
  }

  changeBookStatus = (book, shelf) =>
    this.props.BooksAPI.update(book, shelf)
      .then(res => this.updateStateBook(book, shelf))

  updateStateBook = (newBookValue, shelf) =>
    this.setState(prevState =>
      prevState.books.map(book =>
        book.id === newBookValue.id && (book.shelf = shelf)
      )
    );


  getAllBooks = () => this.props.BooksAPI.getAll().then(allBooks => this.setState({ books: allBooks }))

  componentDidMount() {
    this.getAllBooks()
  }

  render() {
    const { BooksAPI } = this.props;
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Route exact path='/' component={this.RouteFor(Library)} />
            <Route exact path='/new' component={this.RouteFor(AddBookPage)} />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }

}