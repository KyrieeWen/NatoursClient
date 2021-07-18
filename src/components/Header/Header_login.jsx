import React from 'react'
import { Link } from 'react-router-dom'

const Header_login = () => {
  return (
    <>
      <header className="header">
        <nav className="nav nav--tours">
          <Link to="/" className="nav__el">
            All tours
          </Link>
        </nav>
        <div className="header__logo">
          <img src="/img/logo-white.png" alt="Natours logo" />
        </div>
        <nav className="nav nav--user"></nav>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button className="nav__el nav__el--login">Log in</button>
        </Link>
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <button className="nav__el nav__el--cta">Sign up</button>
        </Link>
      </header>
    </>
  )
}

export default Header_login
