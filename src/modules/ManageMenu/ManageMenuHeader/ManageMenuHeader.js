import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import FloatingActionButton from "material-ui/FloatingActionButton";
import NavigationArrowDropDown from "material-ui/svg-icons/navigation/arrow-drop-down";
import { PropTypes } from 'prop-types';

function ManageMenuHeader(props) {
  const { type, handleButtonClick } = props
  return (
    type === 'fab' ?
      <FloatingActionButton
        mini={true}
        tooltip="Change Bookshelf"
        onClick={handleButtonClick}>
        <NavigationArrowDropDown />
      </FloatingActionButton>
      :
      <IconButton
        tooltip="Change Bookshelf"
        onClick={handleButtonClick}>
        <NavigationArrowDropDown />
      </IconButton>
  )
}

ManageMenuHeader.propTypes = {
  handleButtonClick: PropTypes.func,
}

export default ManageMenuHeader