import React from "react";
import CircularProgress from "material-ui/CircularProgress";
import './Loading.css'

export default function Loading(props) {
  return (
    <div className="overlay-content">
      <div className="loader">
        <CircularProgress style={{ margin: '0 auto' }} />
      </div>
    </div>
  )
}