/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import axios from 'axios'
import * as actionCreators from './store/actionCreators'
import { loadStripe } from '@stripe/stripe-js'
import { connect } from 'react-redux'
import Header_login from '../Header/Header_login'
import Header_logout from '../Header/Header_logout'
import Mapbox from '../Mapbox'
import Footer from '../Footer'
import Error from '../Error'
import '../../css/style.css'

const stripePromise = loadStripe(
  'pk_test_51JCfZbKvvwsDx8yCA6zWy28rpXOF3a2U5rllgudoxUOyqjBmH0dfZYK4dIhGyrwv2B8wdMNhslmZ7qK9oJd1K64900uOaKJRTb'
)
class Detail extends Component {
  componentDidMount() {
    const { slug } = this.props.match.params
    this.props.getTour(slug)
  }

  bookTour = async (userId, tourId) => {
    // Get checkout session from API
    // const session = await axios(
    //   `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${userId}/${tourId}`
    // )
    const session = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${userId}/${tourId}`,
      withCredentials: true,
    })
    const stripe = await stripePromise
    setTimeout(async function () {
      await stripe.redirectToCheckout({
        sessionId: session.data.session.id,
      })
    }, 100)
  }

  render() {
    const { tour, isError, isLoading, errInfo } = this.props
    if (isLoading)
      return (
        <div className="loadEffect">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )
    const rates = [1, 2, 3, 4, 5]
    return isError ? (
      <Error errInfo={errInfo} />
    ) : (
      <>
        {this.props.isLoggedIn ? <Header_logout /> : <Header_login />}
        <section className="section-header">
          <div className="header__hero">
            <div className="header__hero-overlay "></div>
            <img src={`/img/tours/${tour.imageCover}`} alt={`${tour.name}`} />
            <div className="heading-box">
              <h1 className="heading-primary">
                <span>{tour.name}</span>
              </h1>
              <div className="heading-box__group">
                <div className="heading-box__detail">
                  <svg className="heading-box__icon">
                    <use xlinkHref="/img/icons.svg#icon-clock"></use>
                  </svg>
                  <span className="heading-box__text">
                    {tour.duration} days
                  </span>
                </div>
                <div className="heading-box__detail">
                  <svg className="heading-box__icon">
                    <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
                  </svg>
                  <span className="heading-box__text">
                    {tour.startLocation.description}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-description">
          <div className="overview-box">
            <div>
              <div className="overview-box__group">
                <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                <div className="overview-box__detail">
                  <svg className="overview-box__icon">
                    <use xlinkHref="/img/icons.svg#icon-calendar"></use>
                  </svg>
                  <span className="overview-box__label">Next date</span>
                  <span className="overview-box__text">
                    {new Date(tour.startDates[0]).toLocaleString('en-gb', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="overview-box__detail">
                  <svg className="overview-box__icon">
                    <use xlinkHref="/img/icons.svg#icon-trending-up"></use>
                  </svg>
                  <span className="overview-box__label">Difficulty</span>
                  <span className="overview-box__text">{tour.difficulty}</span>
                </div>
                <div className="overview-box__detail">
                  <svg className="overview-box__icon">
                    <use xlinkHref="/img/icons.svg#icon-user"></use>
                  </svg>
                  <span className="overview-box__label">Participants</span>
                  <span className="overview-box__text">
                    {tour.maxGroupSize} people
                  </span>
                </div>
                <div className="overview-box__detail">
                  <svg className="overview-box__icon">
                    <use xlinkHref="/img/icons.svg#icon-star"></use>
                  </svg>
                  <span className="overview-box__label">Rating</span>
                  <span className="overview-box__text">
                    {tour.ratingsAverage} / 5
                  </span>
                </div>
              </div>

              <div className="overview-box__group">
                <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
                {tour.guides.map((item) => {
                  return (
                    <div className="overview-box__detail" key={Math.random()}>
                      <img
                        src={`/img/users/${item.photo}`}
                        alt="Lead guide"
                        className="overview-box__img"
                      />
                      <span className="overview-box__label">{item.role}</span>
                      <span className="overview-text">{item.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="description-box">
            <h2 className="heading-secondary ma-bt-lg">
              About the {tour.name}
            </h2>
            <p className="description__text">{tour.description}</p>
            <p className="description__text">{tour.summary}</p>
          </div>
        </section>

        <section className="section-pictures">
          {tour.images.map((item) => {
            return (
              <div className="picture-box" key={Math.random()}>
                <img
                  className="picture-box__img picture-box__img--1"
                  src={`/img/tours/${item}`}
                  alt="The Park Camper Tour 1"
                />
              </div>
            )
          })}
        </section>

        <div>
          <Mapbox
            lng={this.props.lng}
            lat={this.props.lat}
            zoom={this.props.zoom}
            locations={tour.locations}
          />
        </div>

        <section className="section-reviews">
          <div className="reviews">
            {tour.reviews.map((item) => {
              return (
                <div className="reviews__card" key={Math.random()}>
                  <div className="reviews__avatar">
                    <img
                      src={`/img/users/${item.user.photo}`}
                      alt={item.user.name}
                      className="reviews__avatar-img"
                    />
                    <h6 className="reviews__user">{item.user.name}</h6>
                  </div>
                  <p className="reviews__text">{item.review}</p>
                  <div className="reviews__rating">
                    {rates.map((number) => {
                      return (
                        <svg
                          key={Math.random()}
                          className={`reviews__star reviews__star--${
                            item.rating >= number ? 'active' : 'inactive'
                          }`}
                        >
                          <use xlinkHref="/img/icons.svg#icon-star"></use>
                          <div>{item.rating}</div>
                        </svg>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="section-cta">
          <div className="cta">
            <div className="cta__img cta__img--logo">
              <img src="/img/logo-white.png" alt="Natours logo" className="" />
            </div>
            {tour.images.map((item, index) => {
              return (
                <img
                  key={Math.random()}
                  src={`/img/tours/${item}`}
                  alt=""
                  className={`cta__img cta__img--${index + 1}`}
                />
              )
            })}
            <div className="cta__content">
              <h2 className="heading-secondary">What are you waiting for?</h2>
              <p className="cta__text">
                {tour.duration} days. 1 adventure. Infinite memories. Make it
                yours today!
              </p>
              {this.props.isLoggedIn ? (
                <button
                  className="btn btn--green span-all-rows"
                  onClick={() => this.bookTour(this.props.userId, tour._id)}
                >
                  Book tour now!
                </button>
              ) : (
                <a href="/login" className="btn btn--green span-all-rows">
                  Log in to book tour
                </a>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.header.isLoggedIn,
    userId: state.header.userId,
    tour: state.tour.tour,
    isError: state.tour.isError,
    errInfo: state.tour.errInfo,
    lng: state.tour.lng,
    lat: state.tour.lat,
    zoom: state.tour.zoom,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTour(slug) {
      dispatch(actionCreators.getTour(slug))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
