import React, { Component } from 'react';
import { func } from "prop-types";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import SearchIcon from "material-ui/svg-icons/action/search";

export default class SearchBar extends Component {
  static propTypes = {
    searchFor: func.isRequired
  }
  state = {
    searchTimeoutId: 0,
    searchText: '',
  }

  HandleChange = (e, value) => {
    this.setState({
      searchText: value
    })
    this.HandleSearchTimer()
  }

  HandleSearchTimer = () => {
    clearTimeout(this.state.searchTimeoutId)
    this.setState({
      searchTimeoutId: setTimeout(this.ExecuteSearchWithStateValue, 3000)
    })
  }

  ExecuteSearchWithStateValue = () => this.props.searchFor(this.state.searchText)

  render() {
    const { searchText } = this.state;
    return (
      <div>
        <TextField hintText={'Search for books'}
          value={searchText}
          onChange={this.HandleChange} />
        <IconButton onClick={this.HandleSearchTimer}>
          <SearchIcon />
        </IconButton>
      </div>
    )
  }
}