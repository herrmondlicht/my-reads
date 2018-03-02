import React, { Component } from 'react';
import { func } from "prop-types";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import SearchIcon from "material-ui/svg-icons/action/search";
import './SearchBar.css'

export default class SearchBar extends Component {
  static propTypes = {
    searchFor: func.isRequired
  }
  state = {
    searchTimeoutId: 0,
    searchText: '',
  }

  static TIMEOUT_TIMER = 3000

  HandleChange = (e, value) => {
    clearTimeout(this.state.searchTimeoutId)
    this.setState({
      searchText: value
    })
    this.HandleSearchTimer()
  }

  HandleSearchTimer = () => {
    this.setState({
      searchTimeoutId: setTimeout(this.ExecuteSearchWithStateValue, this.TIMEOUT_TIMER)
    })
  }

  ExecuteSearchWithStateValue = () => {
    const { searchText } = this.state;
    this.props.searchFor(searchText)
  }

  render() {
    const { searchText } = this.state;
    return (
      <div className="search-container">
        <TextField style={{ width: 'calc(100% - 30px)' }} hintText={'Search for books'}
          value={searchText}
          onChange={this.HandleChange} />
        <SearchIcon />
      </div>
    )
  }
}