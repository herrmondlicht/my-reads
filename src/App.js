import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI.js';

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
      <div className="App">
        {this.state.bookshelf.map(book => (
            <span
              style={{display:"block"}}
              key={book.id}>{book.title}</span>
        ))}
      </div>
    );
  }
}

export default App;
