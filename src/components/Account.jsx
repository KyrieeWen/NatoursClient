/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import axios from 'axios'
import * as actionCreators from './Header/store/actionCreators'
import { connect } from 'react-redux'
import Header_login from './Header/Header_login'
import Header_logout from './Header/Header_logout'
import Footer from './Footer'

class Account extends Component {
  constructor(props) {
    super(props)
    // console.log(props)
    this.state = {
      name: props.userName,
      email: props.userEmail,
      photo: props.userImage,
      id: props.userId,
      isLoggedIn: props.isLoggedIn,
      isAdmin: '',
      currentPassword: props.currentPassword,
      newPassword: '',
      confirmedPassword: '',
    }
  }

  handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0])
      this.setState({
        photo: e.target.files[0].name,
      })
    }
  }

  handleInputChange(e) {
    e.preventDefault()
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  render() {
    const { name, email, photo, isAdmin, currentPassword } = this.state
    return (
      <>
        {this.props.isLoggedIn ? <Header_logout /> : <Header_login />}
        <main className="main">
          <div className="user-view">
            <nav className="user-view__menu">
              <ul className="side-nav">
                <li className="side-nav--active">
                  <a href="#">
                    <svg>
                      <use xlinkHref="img/icons.svg#icon-settings"></use>
                    </svg>
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="/my-tours"
                    onClick={(e) =>
                      this.props.getBooking(
                        e,
                        this.state.id,
                        this.state.name,
                        this.state.email,
                        this.state.photo
                      )
                    }
                  >
                    <svg>
                      <use xlinkHref="img/icons.svg#icon-briefcase"></use>
                    </svg>
                    My bookings
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg>
                      <use xlinkHref="img/icons.svg#icon-star"></use>
                    </svg>
                    My reviews
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg>
                      <use xlinkHref="img/icons.svg#icon-credit-card"></use>
                    </svg>
                    Billing
                  </a>
                </li>
              </ul>
              {isAdmin === 'admin' ? (
                <div className="admin-nav">
                  <h5 className="admin-nav__heading">Admin</h5>
                  <ul className="side-nav">
                    <li>
                      <a href="#">
                        <svg>
                          <use xlinkHref="img/icons.svg#icon-map"></use>
                        </svg>
                        Manage tours
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg>
                          <use xlinkHref="img/icons.svg#icon-users"></use>
                        </svg>
                        Manage users
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg>
                          <use xlinkHref="img/icons.svg#icon-star"></use>
                        </svg>
                        Manage reviews
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg>
                          <use xlinkHref="img/icons.svg#icon-briefcase"></use>
                        </svg>
                        Manage Bookings
                      </a>
                    </li>
                  </ul>
                </div>
              ) : null}
            </nav>
            <div className="user-view__content">
              <div className="user-view__form-container">
                <h2 className="heading-secondary ma-bt-md">
                  Your account settings
                </h2>
                <form className="form form-user-data">
                  <div className="form__group">
                    <label className="form__label" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="form__input"
                      name="name"
                      id="name"
                      type="text"
                      value={name}
                      required="required"
                      onChange={(e) => this.handleInputChange(e)}
                    />
                  </div>
                  <div className="form__group ma-bt-md">
                    <label className="form__label" htmlFor="email">
                      Email address
                    </label>
                    <input
                      className="form__input"
                      name="email"
                      id="email"
                      type="email"
                      value={email}
                      required="required"
                      onChange={(e) => this.handleInputChange(e)}
                    />
                  </div>
                  <div className="form__group form__photo-upload">
                    <img
                      className="form__user-photo"
                      src={`img/users/${photo}`}
                      alt="User photo"
                    />
                    <input
                      className="form__upload"
                      type="file"
                      id="photo"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => this.handleImageChange(e)}
                    />
                    <label htmlFor="photo">Choose new photo</label>
                  </div>
                  <div className="form__group right">
                    <button
                      className="btn btn--small btn--green"
                      onClick={(e) =>
                        this.props.updateUser(
                          e,
                          this.state.name,
                          this.state.email,
                          this.state.photo,
                          this.state.id,
                          this.state.isLoggedIn
                        )
                      }
                    >
                      Save settings
                    </button>
                  </div>
                </form>
              </div>
              <div className="line">&nbsp;</div>
              <div className="user-view__form-container">
                <h2 className="heading-secondary ma-bt-md">Password change</h2>
                <form className="form form-user-settings">
                  <div className="form__group">
                    <label className="form__label" htmlFor="currentPassword">
                      Current password
                    </label>
                    <input
                      className="form__input"
                      id="currentPassword"
                      type="password"
                      placeholder="••••••••"
                      required="required"
                      minLength="8"
                      // value={currentPassword}
                      onChange={(e) => this.handleInputChange(e)}
                    />
                  </div>
                  <div className="form__group">
                    <label className="form__label" htmlFor="newPassword">
                      New password
                    </label>
                    <input
                      className="form__input"
                      id="newPassword"
                      type="password"
                      placeholder="••••••••"
                      required="required"
                      minLength="8"
                      onChange={(e) => this.handleInputChange(e)}
                    />
                  </div>
                  <div className="form__group ma-bt-lg">
                    <label className="form__label" htmlFor="confirmedPassword">
                      Confirm password
                    </label>
                    <input
                      className="form__input"
                      id="confirmedPassword"
                      type="password"
                      placeholder="••••••••"
                      required="required"
                      minLength="8"
                      onChange={(e) => this.handleInputChange(e)}
                    />
                  </div>
                  <div className="form__group right">
                    <button
                      className="btn btn--small btn--green"
                      onClick={(e) =>
                        this.props.updatePassword(
                          e,
                          this.state.currentPassword,
                          this.state.newPassword,
                          this.state.confirmedPassword,
                          this.state.id,
                          this.state.isLoggedIn,
                          this.state.name,
                          this.state.email,
                          this.state.photo
                        )
                      }
                    >
                      Save password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.header.isLoggedIn,
    userId: state.header.userId,
    userName: state.header.userName,
    userEmail: state.header.userEmail,
    userImage: state.header.userImage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser(e, name, email, photo, id, isLoggedIn) {
      dispatch(actionCreators.updateUser(e, name, email, photo, id, isLoggedIn))
    },
    updatePassword(
      e,
      currentPassword,
      newPassword,
      confirmedPassword,
      userId,
      isLoggedIn,
      userName,
      userEmail,
      userImage
    ) {
      dispatch(
        actionCreators.updatePassword(
          e,
          currentPassword,
          newPassword,
          confirmedPassword,
          userId,
          isLoggedIn,
          userName,
          userEmail,
          userImage
        )
      )
    },
    getBooking(e, userId, userName, userEmail, userImage) {
      dispatch(
        actionCreators.getBooking(e, userId, userName, userEmail, userImage)
      )
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
