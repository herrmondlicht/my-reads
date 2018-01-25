import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Menu, { MenuItem } from 'material-ui/Menu';

const defaultMenu = [
  { label: 'Currently Reading', action: 'currentlyReading' },
  { label: 'Want to Read', action: 'wantToRead' },
  { label: 'Read', action: 'read' },
  { label: 'None', action: ''}
];

class StatusList extends Component {

  handleMenuChange = (event,value) => {
    const { closePopover, changeBookStatus } = this.props
    changeBookStatus(value)
    !!closePopover && closePopover()
  }

  render() {
    //preciso colocar um padrão aqui pro manage menu caso não haja parâmetros vindo do pai
    const { menuItems = defaultMenu, selectedValue = '', changeBookStatus, closePopover= () => {} } = this.props;
    return (
      <MuiThemeProvider>
        <Menu onChange={this.handleMenuChange}>
          {menuItems.map(menuItem => (
            <MenuItem
              primaryText={menuItem.label}
              action={menuItem.action}
              key={menuItem.action}
              value={menuItem.action}
              checked={menuItem.action === selectedValue} />
          ))}
        </Menu>
      </MuiThemeProvider>
    )
  }
}

StatusList.propTypes = {
  changeBookStatus: PropTypes.func.isRequired,
  menuItems: PropTypes.array,
  selectedValue: PropTypes.string,
}


export default StatusList;