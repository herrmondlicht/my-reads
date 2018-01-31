import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar'
import Library from './modules/Library/Library'
import Book from './modules/Book/Book';
import Shelf from './modules/Shelf/Shelf';
class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <Library BooksAPI={BooksAPI} />
      </MuiThemeProvider>
    )
  }
}

export default App;
