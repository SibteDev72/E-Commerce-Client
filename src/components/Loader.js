import React from 'react'
import "./Loader.scss";

function Loader({ loaderText }) {
  return (
    <div className='loaderWrap'>
        <p className='loader_text'>{loaderText}</p>
        <div className="loader"></div>
    </div>
  )
}

export default Loader