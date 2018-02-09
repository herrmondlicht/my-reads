import React, { Component } from 'react';
import { func } from "prop-types";
import SearchBar from "../SearchBar";
import Shelf from "../Shelf/Shelf";

export default class AddBookPage extends Component {



  render() {
    return (
      <div>
        <SearchBar searchFor={() => { }} />
        <Shelf bookList={[]}
          changeBookStatus={() => { }}
          title={'Results'}
          shelfId={'none'}
        />
      </div>
    )
  }
}