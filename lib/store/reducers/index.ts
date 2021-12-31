import { combineReducers } from 'redux'
import appSettings from './app-settings'
import authenticatedUser from './authenticated-user'
import cache from './cache'
import chats from './chats'
import formLogin from './form-login'
import formNew from './form-new'
import formProfile from './form-profile'
import formRegister from './form-register'
import formReport from './form-report'
import searchSettings from './search-settings'

const reducers = {
  appSettings,
  authenticatedUser,
  cache,
  chats,
  formLogin,
  formNew,
  formProfile,
  formRegister,
  formReport,
  searchSettings,
}

export type Reducers = typeof reducers

export default combineReducers<Reducers, any>(reducers)
