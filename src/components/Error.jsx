/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import Header from './Header/Header'
import Footer from './Footer'
// import axios from 'axios'

class Error extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <>
        <Header />
        <main className="main">
          <div className="error">
            <div className="error__title">
              <h2 className="heading-secondary heading-secondary--error">
                Uh oh! Something went wrong!{' '}
              </h2>
              <h2 className="error__emoji">😢 🤯</h2>
            </div>
            <div className="error__msg">{this.props.errInfo}</div>
          </div>
        </main>
        <Footer />
      </>
    )
  }
}

export default Error
