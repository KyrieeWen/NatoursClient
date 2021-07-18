/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MyTour extends Component {
  render() {
    const {
      name,
      imageCover,
      summary,
      difficulty,
      duration,
      description,
      startDate,
      stops,
      groupSize,
      price,
      ratingsAverage,
      ratingsQuantity,
      slug,
    } = this.props
    return (
      <>
        <div className="card">
          <div className="card__header">
            <div className="card__picture">
              <div className="card__picture-overlay">&nbsp;</div>
              <img
                src={`http://127.0.0.1:3000/img/tours/${imageCover}`}
                alt={name}
                className="card__picture-img"
              />
            </div>

            <h3 className="heading-tertirary">
              <span>{name}</span>
            </h3>
          </div>

          <div className="card__details">
            <h4 className="card__sub-heading">
              {difficulty} {duration}-day tour
            </h4>
            <p className="card__text">{summary}</p>
            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="img/icons.svg#icon-map-pin"></use>
              </svg>
              <span>{description}</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="img/icons.svg#icon-calendar"></use>
              </svg>
              <span>{startDate}</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="img/icons.svg#icon-flag"></use>
              </svg>
              <span>{stops} stops</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="img/icons.svg#icon-user"></use>
              </svg>
              <span>{groupSize} people</span>
            </div>
          </div>

          <div className="card__footer">
            <p>
              <span className="card__footer-value">${price}</span>
              <span className="card__footer-text"> per person</span>
            </p>
            <p className="card__ratings">
              <span className="card__footer-value">{ratingsAverage} </span>
              <span className="card__footer-text">
                rating ({ratingsQuantity})
              </span>
            </p>
            {/* <a href={`/tours/${slug}`} className="btn btn--green btn--small">
              Details
            </a> */}
            <Link
              to={`/tour/${slug}`}
              params={`${slug}`}
              className="btn btn--green btn--small"
            >
              Details
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default MyTour
