import { combineReducers } from 'redux'
import { reducer as headerReducer } from '../components/Header/store'
import { reducer as tourReducer } from '../components/Detail/store'

export default combineReducers({
  header: headerReducer,
  tour: tourReducer,
})
