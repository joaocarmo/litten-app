/**
 * @format
 * @flow
 */

import { combineReducers } from 'redux'
import appSettings from './app-settings'
import authenticatedUser from './authenticated-user'
import formLogin from './form-login'
import formNew from './form-new'
import formRegister from './form-register'
import searchSettings from './search-settings'

const rootReducer = combineReducers({
  appSettings,
  authenticatedUser,
  formLogin,
  formNew,
  formRegister,
  searchSettings,
})

export default rootReducer
