/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../Header/store/actionCreators.js'

const Header_logout = (props) => {
  return (
    <>
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
        <Link to="/" className="nav__el" onClick={props.logout}>
          Log out
        </Link>
        <Link to="/me" className="nav__el">
          <img
            src={`/img/users/${props.userImage}`}
            alt="User photo"
            className="nav__user-img"
          />
          <span>{props.userName}</span>
        </Link>
      </header>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    userName: state.header.userName,
    userImage: state.header.userImage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout() {
      dispatch(actionCreators.logout())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header_logout)
