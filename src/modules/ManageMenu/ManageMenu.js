import React, { Component } from 'react';
import { PropTypes } from 'prop-types';


class ManageMenu extends Component {

	render(){
    const { menuItems, changeBookStatus } = this.props;
    return (
      <div>
        {menuItems && (menuItems.map(menuItem => (
          <div 
            onClick={()=>{
              changeBookStatus(menuItem);
            }}
            key={menuItem.action}
            action={menuItem.action}
            >
            {menuItem.label}
          </div>
        )))}
      </div> 
    )
  }
}

ManageMenu.propTypes = {
  changeBookStatus: PropTypes.func.isRequired,
  menuItems:PropTypes.array,
}


export default ManageMenu;