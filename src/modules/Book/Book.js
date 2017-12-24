import { Component } from 'react';
import { PropTypes } from 'prop-types';


class Book extends Component {
	render(){
		<div></div> 
	}
}

Book.PropTypes = {
	bookObject:PropTypes.object.isRequired,
}


export default Book;