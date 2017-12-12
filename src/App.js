import React, { Component } from 'react';
import { Link , Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar'
import Library from './Library'
class App extends Component {

  state = {
    bookshelf: [],
  }

  componentDidMount(){
    BooksAPI.getAll().then(allBooks =>
      this.setState({
        bookshelf:allBooks,
      })
    );
  }



  render() {
    console.log(this.state.bookshelf);
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="My Reads App"
            showMenuIconButton={false}
            titleStyle={{textAlign:"center"}}
            />
          <Library />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
