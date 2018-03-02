
import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from 'material-ui/svg-icons/content/add';
import ShelvesData from '../../utils/Shelves'
import Shelf from '../Shelf/Shelf';
import "./Library.css";
import { PropTypes } from "prop-types";
import CustomAppBar from "../CustomAppBar";

class Library extends Component {


  getBooksFromShelf = (shelfId) =>
    this.props.books.filter(book => book.shelf === shelfId)

  render() {
    const { changeBookStatus, books } = this.props
      , shelves = ShelvesData;

    return (
      <MuiThemeProvider>
        <div>
          <CustomAppBar title="Your Books" />
          <div>
            {shelves.map(shelf =>
              <Shelf key={shelf.id}
                bookList={this.getBooksFromShelf(shelf.id)}
                title={shelf.title}
                shelfId={shelf.id}
                changeBookStatus={changeBookStatus} />
            )}
          </div>
          <div className="fab-button-container">
            <FloatingActionButton href='search'>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

Library.propTypes = {
  changeBookStatus: PropTypes.func.isRequired,
  books: PropTypes.array
}

export default Library;