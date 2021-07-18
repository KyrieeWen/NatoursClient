import React from 'react'
import ReactDOM from 'react-dom'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Provider } from 'react-redux'
import store from './store/'
import { persistor } from './store/'
import { PersistGate } from 'redux-persist/lib/integration/react'
import App from './App'

ReactDOM.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </>,
  document.getElementById('root')
)
