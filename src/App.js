import React, { Component } from 'react';
import { Link , Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar'
import Library from './Library'
import Book from './modules/Book/Book';
class App extends Component {

  state = {
    bookshelf: [],
    shelfSelectedBooks:[],
  }

  componentDidMount(){
    BooksAPI.getAll().then(allBooks =>
      this.setState({
        bookshelf:allBooks,
      })
    );
  }

  handleBookSelection = (book,value) => {
    if(!!value) this.setState(prevstate => ({shelfSelectedBooks:prevstate.shelfSelectedBooks.concat([book])}))
    else this.setState(prevstate => (
      {shelfSelectedBooks: prevstate.shelfSelectedBooks.filter(
        b=> b.id != book.id
      )}))
  }


  render() {

    console.log(this.state.shelfSelectedBooks)
    const {bookshelf, shelfSelectedBooks} = this.state
    return (
      <MuiThemeProvider>
        <div style={{display:'inline-flex'}}>
          { bookshelf.map(book => (
            <Book key={book.id}
              bookObject={book}
              changeBookStatus={()=>{}}
              selectionFunction={this.handleBookSelection}
              isChecked={!!shelfSelectedBooks.find(b=> b.id == book.id)}
            />)) 
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
