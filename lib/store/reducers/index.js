/**
 * @format
 * @flow
 */

import { combineReducers } from 'redux'
import authenticatedUser from './authenticated-user'
import appSettings from './app-settings'
import formRegister from './form-register'
import formLogin from './form-login'
import formNew from './form-new'

const rootReducer = combineReducers({
  appSettings,
  authenticatedUser,
  formRegister,
  formLogin,
  formNew,
})

export default rootReducer
