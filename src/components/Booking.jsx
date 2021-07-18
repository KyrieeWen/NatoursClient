/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header_login from './Header/Header_login'
import Header_logout from './Header/Header_logout'
import Footer from './Footer'
import MyTour from './MyTour'
import '../css/style.css'

class Booking extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <>
        {this.props.isLoggedIn ? <Header_logout /> : <Header_login />}
        <main className="main">
          <div className="card-container">
            {this.props.myTours.map((item, i) => {
              return (
                <MyTour
                  id={i}
                  key={item._id}
                  name={item.name}
                  imageCover={item.imageCover}
                  summary={item.summary}
                  difficulty={item.difficulty}
                  duration={item.duration}
                  description={item.startLocation.description}
                  startDate={new Date(item.startDates[0]).toLocaleString(
                    'en-gb',
                    {
                      month: 'long',
                      year: 'numeric',
                    }
                  )}
                  stops={item.locations.length}
                  groupSize={item.maxGroupSize}
                  price={item.price}
                  ratingsAverage={item.ratingsAverage}
                  ratingsQuantity={item.ratingsQuantity}
                  slug={item.slug}
                />
              )
            })}
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
    myTours: state.header.myTours,
  }
}

export default connect(mapStateToProps, null)(Booking)
