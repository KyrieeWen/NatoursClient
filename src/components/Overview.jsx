/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Header_login from './Header/Header_login'
import Header_logout from './Header/Header_logout'
import Footer from './Footer'
import Tour from './Tour'
import '../css/style.css'

class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tours: [],
    }
  }
  componentDidMount = () => {
    axios.get('/api/v1/tours/').then((response) => {
      this.setState({
        tours: response.data.data.data,
      })
    })
  }
  render() {
    return (
      <>
        {this.props.isLoggedIn ? <Header_logout /> : <Header_login />}
        <main className="main">
          <div className="card-container">
            {this.state.tours.map((item) => {
              return (
                <Tour
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
