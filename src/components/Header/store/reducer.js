/* eslint-disable no-unused-vars */
import * as actionTypes from './actionTypes'

const defaultState = {
  myTours: [{}],
  userId: '',
  userName: '',
  userEmail: '',
  userImage: '',
  currentPassword: '',
  newPassword: '',
  confirmedPassword: '',
  isLoggedIn: false,
}

export default (state = defaultState, action) => {
  if (action.type === actionTypes.LOG_IN) {
    return {
      isLoggedIn: true,
    }
  }
  if (action.type === actionTypes.LOG_OUT) {
    return {
      isLoggedIn: false,
    }
  }

  if (action.type === actionTypes.CHANGE_USER_INFO) {
    return {
      userId: action.userId,
      userName: action.userName,
      userEmail: action.userEmail,
      userImage: action.userImage,
      isLoggedIn: action.isLoggedIn,
    }
  }

  if (action.type === actionTypes.UPDATE_USER_INFO) {
    return {
      userName: action.userName,
      userEmail: action.userEmail,
      userImage: action.userImage,
      isLoggedIn: action.isLoggedIn,
    }
  }

  if (action.type === actionTypes.UPDATE_USER_PASS) {
    return {
      currentPassword: action.currentPassword,
      newPassword: action.newPassword,
      confirmedPassword: action.confirmedPassword,
      userId: action.userId,
      isLoggedIn: action.isLoggedIn,
      userName: action.userName,
      userEmail: action.userEmail,
      userImage: action.userImage,
    }
  }
  if (action.type === actionTypes.UPDATE_USER_TOUR) {
    return {
      myTours: action.myTours,
      userId: action.userId,
      userName: action.userName,
      userEmail: action.userEmail,
      userImage: action.userImage,
      isLoggedIn: true,
    }
  }
  return state
}
