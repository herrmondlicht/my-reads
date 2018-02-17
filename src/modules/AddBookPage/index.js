import React, { Component } from 'react';
import { func, object } from "prop-types";
import SearchBar from "../SearchBar";
import Shelf from "../Shelf/Shelf";

export default class AddBookPage extends Component {

  static propTypes = {
    BooksAPI: object.isRequired,
    loadedBooks: object.isRequired,
  }

  state = {
    bookList: []
  }

  HandleSearch = (searchText) => {
    const { BooksAPI } = this.props;
    BooksAPI.search(searchText)
      .then(res => {
        if (res.error) throw res
        this.setState({ bookList: res })
      })
      .catch(res => this.setState({ bookList: [] }))
  }

  FlagBooksShelves = () => {
    
  }

  render() {
    const { bookList } = this.state;
    return (
      <div>
        <SearchBar searchFor={this.HandleSearch} />
        <Shelf bookList={bookList}
          changeBookStatus={() => { }}
          title={'Results'}
          shelfId={'none'}
        />
      </div>
    )
  }
}