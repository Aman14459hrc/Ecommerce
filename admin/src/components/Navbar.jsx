import React from 'react'
import { assets } from "../assets/assets"
import '../design/nav.css'

const Navbar = ({ setToken }) => {
  return (
    <div className="navbar">
        <img src={assets.logo} alt="logo" />
        <button onClick={() => setToken('')}>Logout</button>
    </div>
  )
}

export default Navbar
