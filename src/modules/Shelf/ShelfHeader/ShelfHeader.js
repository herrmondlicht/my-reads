import React from "react";
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";
import ManageMenu from "../../ManageMenu/ManageMenu";
import SelectAllIcon from "material-ui/svg-icons/content/select-all";
import CloseIcon from "material-ui/svg-icons/navigation/close";
import IconButton from "material-ui/IconButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

export default function ShelfHeader(props) {
  const {
    title,
    selectModeOn,
    changeSelectedBookStatus,
    selectedValue,
    toggleSelectionMode,
    isFetching,
    shelfId } = props

  return (
    <MuiThemeProvider>
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={title} />
            {selectModeOn && !isFetching ?
              <div style={{ display: 'inline-flex' }}>
                <IconButton touch={true} onClick={toggleSelectionMode} >
                  <CloseIcon />
                </IconButton>
                <ManageMenu changeBookStatus={changeSelectedBookStatus} selectedValue={shelfId} />
              </div>
              : <IconButton touch={true} onClick={toggleSelectionMode} >
                <SelectAllIcon />
              </IconButton>}
          </ToolbarGroup>
        </Toolbar>
      </div>
    </MuiThemeProvider>
  )
}