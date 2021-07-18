/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'
import Header_login from './Header_login'
import Header_logout from './Header_logout'

const Header = (props) => {
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <a href="/" className="nav__el">
          All tours
        </a>
      </nav>
      <div className="header__logo">
        <img src="/img/logo-white.png" alt="Natours logo" />
      </div>
      <nav className="nav nav--user"></nav>
      {props.isLoggedIn ? <Header_logout /> : <Header_login />}
    </header>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.header.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
