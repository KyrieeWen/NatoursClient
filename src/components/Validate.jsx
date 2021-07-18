/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { connect } from 'react-redux'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as actionCreators from './Header/store/actionCreators'
import * as Yup from 'yup'

// eslint-disable-next-line no-unused-vars
const SignupForm = (props) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object().shape({
        // eslint-disable-next-line prettier/prettier
        email: Yup.string().email('Invalid email address').required('Email cannot be empty'),
        password: Yup.string()
          .required('No password provided.')
          .min(8, 'Password is too short - should be 8 characters minimum')
          .matches(/(?=.*[0-9])/, 'Password must contain a number'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log('Logging in', values)
          setSubmitting(false)
          props.login(values)
        }, 400)
      }}
    >
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <Form className="form">
          <div className="form__group">
            <label className="form__label" htmlFor="firstName">
              Email
            </label>
            <Field
              name="email"
              type="email"
              id="form__input_1"
              minLength="8"
              placeholder="admin@natours.io"
            />
            <div style={{ color: 'red', fontSize: '16px' }}>
              <ErrorMessage name="email" />
            </div>
          </div>

          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <Field
              name="password"
              type="password"
              id="form__input_2"
              placeholder="••••••••"
            />
            <div style={{ color: 'red', fontSize: '16px' }}>
              <ErrorMessage className="input-feedback" name="password" />
            </div>
          </div>

          <div className="form__group">
            <button className="btn btn--green" type="submit">
              Login
            </button>
          </div>
        </Form>
      </div>
    </Formik>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    login(values) {
      dispatch(actionCreators.login(values))
    },
  }
}

export default connect(null, mapDispatchToProps)(SignupForm)
