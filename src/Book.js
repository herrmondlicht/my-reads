import React, { Component } from 'react'
import { Link } from 'react-router-dom'

function Book(props){
  return (
    <div>
      <img src={props.book.imageLinks.thumbnail} />
      <span>{props.book.title}</span>
    </div>
  )
}

export default Book
