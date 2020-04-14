import { combineReducers } from 'redux'
import authenticatedUser from './authenticated-user'
import formRegister from './form-register'

const rootReducer = combineReducers({
  authenticatedUser,
  formRegister,
})

export default rootReducer
