import axios from 'axios'
import * as actionTypes from './actionTypes'

const get_tour_info = (tour, isLoading, lng, lat) => ({
  type: actionTypes.GET_TOUR_INFO,
  tour,
  isLoading,
  lng,
  lat,
})

const get_tour_info_error = (isLoading, isError) => ({
  type: actionTypes.GET_TOUR_INFO_ERROR,
  isLoading,
  isError,
})

export const getTour = (slug) => {
  return (dispatch) => {
    axios
      .get(`http://127.0.0.1:3000/tour/${slug}`)
      .then((response) => {
        const { tour } = response.data
        const isLoading = false
        const lng = response.data.tour.startLocation.coordinates[0]
        const lat = response.data.tour.startLocation.coordinates[1]
        const action = get_tour_info(tour, isLoading, lng, lat)
        dispatch(action)
      })
      .catch((err) => {
        const isLoading = false
        const isError = true
        const action = get_tour_info_error(isLoading, isError)
        dispatch(action)
      })
  }
}
