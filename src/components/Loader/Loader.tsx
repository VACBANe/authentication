import React from 'react'
import './Loader.css'
const Loader = () => {
  return (
    <div className="loader-bg">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loader
