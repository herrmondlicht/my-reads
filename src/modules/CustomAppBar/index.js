import React, { Component } from "react";
import { string, bool } from "prop-types";
import { AppBar, FlatButton, IconButton } from "material-ui";
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';

export default class CustomAppBar extends Component {
  static propTypes = {
    title: string.isRequired,
    backIcon: bool
  }

  BackButton = () => (<IconButton href={'/'}><BackIcon color="#FFF" /></IconButton>)

  render() {
    const { title, showBackIcon } = this.props
    return (
      <AppBar
        title={title}
        iconElementLeft={<this.BackButton />}
        iconStyleLeft={{ display: `${showBackIcon ? 'block' : 'none'}` }}
      />
    )
  }
}