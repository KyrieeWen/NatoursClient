/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'
import SignupForm from './Validate'
import Header_login from './Header/Header_login'
import Header_logout from './Header/Header_logout'
import Footer from './Footer'

const Login = (props) => {
  return (
    <>
      {props.isLoggedIn ? <Header_logout /> : <Header_login />}
      <SignupForm />
      <Footer />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.header.isLoggedIn,
  }
}

export default connect(mapStateToProps, null)(Login)
