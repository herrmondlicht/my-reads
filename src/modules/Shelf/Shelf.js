import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import PropTypes from 'prop-types';
import Book from "../Book/Book";
import ShelfHeader from './ShelfHeader/ShelfHeader'
import './Shelf.css'
import CircularProgress from "material-ui/CircularProgress/CircularProgress";
import Loading from "../Loading/Loading";
import Paper from "material-ui/Paper/Paper";

class Shelf extends Component {
  state = {
    selectModeOn: false,
    selectedBooks: [],
    booksUpdatePromises: [],
    isFetching: false,
  }

  toggleSelectionMode = () => {
    this.setState((prevState) => ({
      selectModeOn: !prevState.selectModeOn
    }))
  }

  handleBookSelection = (book, value) => {
    this.setState((prevState) => ({
      selectedBooks: prevState.selectedBooks.filter(filterBook => filterBook.id !== book.id)
    }))
    value && this.setState((prevState) => ({
      selectedBooks: prevState.selectedBooks.concat([book])
    }))
  }

  createBookPromisesArray = (shelf) =>
    this.state.selectedBooks.map(book =>
      this.createBookPromise(book, shelf))

  createBookPromise = (book, shelf) => new Promise((resolve, reject) =>
    this.props.updateBook(book, shelf)
      .then(res => resolve(res))
      .catch(err => reject(err))
  )

  changeSelectedBookStatus = (shelf) => {
    const bookPromises = this.createBookPromisesArray(shelf);
    this.setState({ isFetching: true });
    this.executeAllBookPromises(bookPromises);
  }

  executeAllBookPromises = (bookPromises) => {
    const { reloadBooks } = this.props
    Promise.all(bookPromises)
      .then(() => {
        this.setState({
          selectedBooks: [],
        })
      })
      .finally(() => this.setState({
        selectModeOn: false,
        isFetching: false
      }))
  }

  render() {
    const { bookList, updateBook, title, shelfId } = this.props;
    const { selectModeOn, selectedBooks, isFetching } = this.state;
    return (
      <MuiThemeProvider>
        <div className="shelf-container">
          <Paper zDepth={2} >
            <div>
              <ShelfHeader
                {...{ title, shelfId }}
                selectModeOn={selectModeOn}
                changeSelectedBookStatus={this.changeSelectedBookStatus}
                toggleSelectionMode={this.toggleSelectionMode} />
            </div>
            <div className="relative">
              {!!isFetching && (
                <Loading />
              )}
              <div className="book-list">
                {bookList.map(book => (
                  <Book key={book.id}
                    bookObject={book}
                    selectionFunction={selectModeOn ? this.handleBookSelection : undefined}
                    isChecked={!!selectedBooks.find(b => b.id === book.id)}
                    changeBookStatus={updateBook} />
                ))}
              </div>
            </div>
          </Paper>
        </div>
      </MuiThemeProvider>
    )
  }
}

Shelf.propTypes = {
  bookList: PropTypes.array.isRequired,
  updateBook: PropTypes.func.isRequired,
}

export default Shelf;