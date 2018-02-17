import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar'
import Main from './modules/Main'

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Main BooksAPI={BooksAPI} />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
