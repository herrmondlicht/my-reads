import { shallow as enzymeShallow, mount as enzymeMount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import React from 'react'
import { PropTypes } from "prop-types";

configure({ adapter: new Adapter() });
const muiTheme = getMuiTheme();
const context = {
  context: { muiTheme },
  childContextTypes: { muiTheme: PropTypes.object }
}
export const shallow = (ReactComponent) => {
  return {
    withProps: (props) => enzymeShallow(<ReactComponent  {...props} />, context)
  }
}

export const mount = (ReactComponent) => {
  const muiTheme = getMuiTheme();
  return {
    withProps: (props) => enzymeMount(<ReactComponent  {...props} />, context),
  }
}

export const insertMUIContext = (RenderedComponent) => {}