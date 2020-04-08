import { combineReducers } from 'redux'
import authenticatedUser from './authenticated-user'

const rootReducer = combineReducers({
  authenticatedUser,
})

export default rootReducer
