import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Popover } from "material-ui/Popover";
import StatusList from "./StatusList/StatusList";
import ManageMenuHeader from './ManageMenuHeader/ManageMenuHeader';

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


  handleCloseRequest = () => this.setState({ openedPopover: false })

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <ManageMenuHeader
            type={this.props.type}
            handleButtonClick={this.handleButtonClick} />
          <Popover onRequestClose={this.handleCloseRequest}
            open={this.state.openedPopover}
            anchorEl={this.state.anchorEl}
          >
            <StatusList {...this.props} closePopover={this.handleCloseRequest} />
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