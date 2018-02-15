
import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from 'material-ui/svg-icons/content/add';
import ShelvesData from '../../utils/Shelves'
import Shelf from '../Shelf/Shelf';
import "./Library.css";
import { PropTypes } from "prop-types";

class Library extends Component {

  state = {
    books: [],
  }

  getAllBooks = () => this.props.BooksAPI.getAll().then(allBooks => this.setState({ books: allBooks }))

  getBooksFromShelf = (shelfId) =>
    this.state.books.filter(book => book.shelf === shelfId)

  changeBookStatus = (book, shelf) =>
    this.props.BooksAPI.update(book, shelf)
      .then(res => this.updateStateBook(book, shelf))

  updateStateBook = (newBookValue, shelf) =>
    this.setState(prevState =>
      prevState.books.map(book =>
        book.id === newBookValue.id && (book.shelf = shelf)
      )
    );

  componentDidMount() {
    this.getAllBooks()
  }

  render() {
    const { books } = this.state
      , shelves = ShelvesData;

    return (
      <MuiThemeProvider>
        <div>
          <div>
            {shelves.map(shelf =>
              <Shelf key={shelf.id}
                bookList={this.getBooksFromShelf(shelf.id)}
                title={shelf.title}
                shelfId={shelf.id}
                changeBookStatus={this.changeBookStatus} />
            )}
          </div>
          <div className="fab-button-container">
            <FloatingActionButton href='new'>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

Library.propTypes = {
  BooksAPI: PropTypes.object.isRequired,
}

export default Library;