import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar'
import AddBookPage from './modules/AddBookPage'
import Library from './modules/Library/Library'
class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <Route exact path='/' render={() => (
          <Library BooksAPI={BooksAPI} />
        )} />
        <Route exact path='/new' render={() => (
          <AddBookPage BooksAPI={BooksAPI}/>
        )} />
      </MuiThemeProvider>
    )
  }
}

export default App;
