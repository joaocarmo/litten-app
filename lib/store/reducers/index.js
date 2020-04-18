import { combineReducers } from 'redux'
import authenticatedUser from './authenticated-user'
import formRegister from './form-register'
import formLogin from './form-login'

const rootReducer = combineReducers({
  authenticatedUser,
  formRegister,
  formLogin,
})

export default rootReducer
