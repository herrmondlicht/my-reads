import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from "material-ui/Paper";
import Checkbox from "material-ui/Checkbox";
import Typography from 'material-ui/styles/typography';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from "material-ui/CircularProgress";
import './Book.css'
import ManageMenu from '../ManageMenu/ManageMenu';
import Loading from '../Loading/Loading'


class Book extends Component {

  state = {
    isFetching: false,
  }

  checkBoxChange = (event, inputChecked) => {
    const { bookObject, selectionFunction } = this.props;
    selectionFunction(bookObject, inputChecked);
  }

  updateBookStatus = (booksNewAction) => {
    const { changeBookStatus, bookObject } = this.props;
    if (!!booksNewAction) {
      this.setState({ isFetching: true })
      changeBookStatus(bookObject, booksNewAction)
        .then(() => this.setState({ isFetching: false }))
        .catch(err => console.log(err))
    }
  }

  render() {
    const { bookObject, selectionFunction = undefined, isChecked = false } = this.props;
    const { isFetching } = this.state;
    return (
      <MuiThemeProvider>
        <div className="book-container">
          {!!selectionFunction && (
            <div className="checkbox-container">
              <Checkbox checked={isChecked} onCheck={this.checkBoxChange} />
            </div>
          )}
          <Paper zDepth={2} className="book-content">
            <div className="relative">
              {!!isFetching && (
                <Loading />
              )}
              <img src={bookObject.imageLinks.thumbnail}
                className='book-image' alt="" />
            </div>
            <div className="book-text-container ">
              <span className="book-title book-text">
                {bookObject.title}
              </span>
              <span className=" book-description book-text">
                {bookObject.subtitle}
              </span>
            </div>
            <div>
              {!!!selectionFunction && (
                <span className="manage-menu">
                  <ManageMenu type={'fab'} changeBookStatus={this.updateBookStatus} selectedValue={bookObject.shelf} />
                </span>
              )}
            </div>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

Book.propTypes = {
  bookObject: PropTypes.object.isRequired,
  changeBookStatus: PropTypes.func.isRequired,
  selectionFunction: PropTypes.func,
  isChecked: PropTypes.bool,
}


export default Book;