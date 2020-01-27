import React from "react"
import './Loading.css'

export const Loading = () => {
  return (
    <div className="ripple-container">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
