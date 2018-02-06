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
    resolve(this.props.changeBookStatus(book, shelf)
      .then(res => resolve(res))
      .catch(err => reject(err)))
  )

  changeSelectedBookStatus = (shelf) => {
    const bookPromises = this.createBookPromisesArray(shelf);
    this.setState({ isFetching: true });
    this.onFinishExecutingPromises(bookPromises);
  }

  onFinishExecutingPromises = (bookPromises) => {
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
    const { bookList, changeBookStatus, title, shelfId } = this.props;
    const { selectModeOn, selectedBooks, isFetching } = this.state;
    return (
      <MuiThemeProvider>
        <div className="shelf-container">
          <Paper zDepth={2} >
            <ShelfHeader
              {...{ title, shelfId }}
              selectModeOn={selectModeOn}
              changeSelectedBookStatus={this.changeSelectedBookStatus}
              toggleSelectionMode={this.toggleSelectionMode} />
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
                    changeBookStatus={changeBookStatus} />
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
  changeBookStatus: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  shelfId: PropTypes.string.isRequired
}

export default Shelf;