import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardMedia, CardText, CardActions, CardTitle} from 'material-ui/Card';
import Checkbox from "material-ui/Checkbox";
import Typography from 'material-ui/styles/typography';
import './Book.css'
import ManageMenu from '../ManageMenu/ManageMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class Book extends Component{

  checkBoxChange = (event, inputChecked) => {
    const {bookObject,selectionFunction} = this.props;
    selectionFunction(bookObject, inputChecked);
  }

  updateBookStatus = (booksNewAction) => {
    const {changeBookStatus, bookObject} = this.props;
    !!booksNewAction && changeBookStatus({book:bookObject, action:booksNewAction})
  }

  render(){
    const {bookObject, selectionFunction = undefined, isChecked=false} = this.props;
    return (
      <MuiThemeProvider>
      <div>
        {!!selectionFunction && (
          <Checkbox checked={isChecked} onCheck={this.checkBoxChange} />
        )}
        <Card className='book-container'>
          <CardMedia>
            <img src={bookObject.imageLinks.thumbnail} alt="" />
          </CardMedia>
          <CardTitle>
            {bookObject.title}
          </CardTitle>
          <CardText>
            {bookObject.subtitle}
          </CardText>
          <CardActions>
            <ManageMenu changeBookStatus={this.updateBookStatus} selectedValue={bookObject.shelf} />
          </CardActions>
        </Card>
      </div>
      </MuiThemeProvider>
    );
  }
}

Book.propTypes = {
	bookObject: PropTypes.object.isRequired,
	changeBookStatus: PropTypes.func.isRequired,
  selectionFunction: PropTypes.func,
  isChecked:PropTypes.bool
}


export default Book;