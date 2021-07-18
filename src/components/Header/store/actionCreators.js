/* eslint-disable no-unused-vars */
import * as actionTypes from './actionTypes'
import Cookies from 'js-cookie'
import axios from 'axios'

const user_login = (userId, userName, userEmail, userImage, isLoggedIn) => ({
  type: actionTypes.CHANGE_USER_INFO,
  userId,
  userName,
  userEmail,
  userImage,
  isLoggedIn,
})

const update_user_info = (userName, userEmail, userImage, isLoggedIn) => ({
  type: actionTypes.UPDATE_USER_INFO,
  userName,
  userEmail,
  userImage,
  isLoggedIn,
})

const update_user_pass = (
  currentPassword,
  newPassword,
  confirmedPassword,
  userId,
  isLoggedIn,
  userName,
  userEmail,
  userImage
) => ({
  type: actionTypes.UPDATE_USER_PASS,
  currentPassword,
  newPassword,
  confirmedPassword,
  userId,
  isLoggedIn,
  userName,
  userEmail,
  userImage,
})

const update_user_tour = (myTours, userId, userName, userEmail, userImage) => ({
  type: actionTypes.UPDATE_USER_TOUR,
  myTours,
  userId,
  userName,
  userEmail,
  userImage,
})

export const login = (values) => {
  return (dispatch) => {
    axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      data: {
        email: values.email,
        password: values.password,
      },
      withCredentials: true,
    })
      .then((res) => {
        const userId = res.data.data.user._id
        const userName = res.data.data.user.name
        const userEmail = values.email
        const userImage = res.data.data.user.photo
        const isLoggedIn = Cookies.get('jwt')
        const action = user_login(
          userId,
          userName,
          userEmail,
          userImage,
          isLoggedIn
        )
        dispatch(action)
        alert('Successfully logged in')
        window.location = '/'
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const logout = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
      withCredentials: true,
    })
      .then((res) => {
        if ((res.data.status = 'success')) {
          const action = {
            type: actionTypes.LOG_OUT,
          }
          dispatch(action)
          alert('Successfully logged out')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const updateUser = (
  e,
  userName,
  userEmail,
  userImage,
  userId,
  isLoggedIn
) => {
  e.preventDefault()
  return (dispatch) => {
    axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
      data: {
        name: userName,
        email: userEmail,
        photo: userImage,
        id: userId,
      },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res)
        const action = update_user_info(
          userName,
          userEmail,
          userImage,
          isLoggedIn
        )
        dispatch(action)
        alert('Successfully updated')
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const updatePassword = (
  e,
  currentPassword,
  newPassword,
  confirmedPassword,
  userId,
  isLoggedIn,
  userName,
  userEmail,
  userImage
) => {
  e.preventDefault()
  return (dispatch) => {
    axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/updatePassword',
      data: {
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmedPassword: confirmedPassword,
        id: userId,
      },
      withCredentials: true,
    })
      .then((res) => {
        alert('Password successfully updated')
        const action = update_user_pass(
          currentPassword,
          newPassword,
          confirmedPassword,
          userId,
          isLoggedIn,
          userName,
          userEmail,
          userImage
        )
        dispatch(action)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const getBooking = (e, userId, userName, userEmail, userImage) => {
  e.preventDefault()
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/my-tours/${userId}`,
      withCredentials: true,
    })
      .then((res) => {
        const { tours } = res.data
        const action = update_user_tour(
          tours,
          userId,
          userName,
          userEmail,
          userImage
        )
        dispatch(action)
        window.location = `/${userId}`
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
