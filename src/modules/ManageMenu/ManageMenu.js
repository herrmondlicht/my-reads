import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Popover } from "material-ui/Popover";
import StatusList from "./StatusList";
import IconButton from "material-ui/IconButton";
import NavigationArrowDropDown from "material-ui/svg-icons/navigation/arrow-drop-down";

class ManageMenu extends Component {

  state = {
    openedPopover: false,
  }

  handleButtonClick = (event) => {
    event.preventDefault()
    this.setState({
      openedPopover: true,
      anchorEl: event.currentTarget,
    });
  }

  closePopover = () => {
    this.setState({
      openedPopover:false,
    })
  }

  handleCloseRequest = () => this.setState({ openedPopover: false })

  render() {
    return (
      <MuiThemeProvider>
        <div>
        <IconButton tooltip="Change Bookshelf" onClick={this.handleButtonClick}>
          <NavigationArrowDropDown />
        </IconButton>
        <Popover onRequestClose={this.handleCloseRequest} 
          open={this.state.openedPopover}
          anchorEl={this.state.anchorEl}
        >
          <StatusList {...this.props} closePopover={this.closePopover} />
        </Popover>
        </div>
      </MuiThemeProvider>
    )
  }
}

ManageMenu.propTypes = {
  changeBookStatus: PropTypes.func.isRequired,
}


export default ManageMenu;