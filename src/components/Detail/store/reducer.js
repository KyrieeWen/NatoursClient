import * as actionTypes from './actionTypes'

const defaultState = {
  tour: {},
  isLoading: true,
  isError: false,
  errInfo: '',
  lng: null,
  lat: null,
  zoom: 9,
}

export default (state = defaultState, action) => {
  if (action.type === actionTypes.GET_TOUR_INFO) {
    return {
      tour: action.tour,
      isLoading: action.isLoading,
      lng: action.lng,
      lat: action.lat,
      zoom: defaultState.zoom,
    }
  }
  if (action.type === actionTypes.GET_TOUR_INFO_ERROR) {
    return {
      isLoading: action.isLoading,
      isError: action.isError,
    }
  }
  return state
}
