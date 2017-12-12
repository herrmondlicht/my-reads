import React, { Component } from 'react';
import { Link , Route } from 'react-router-dom'


class Library extends Component{
  render(){
    return (
      <div>
        <Route exact path="/" render={()=>(
            <div>Rota 1</div>
          )}
        />
        <Route exact path="/search" render={()=>(
            <div>Rota 2</div>
          )}
        />
      </div>
    )
  }
}

export default Library;
