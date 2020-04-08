import { combineReducers } from 'redux'
import { AUTH_USER_SET_JWT } from './actions'

function authenticatedUser(
  state = {
    jwt: '',
  },
  action,
) {
  switch (action.type) {
    case AUTH_USER_SET_JWT:
      return { ...state, jwt: action.payload }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  authenticatedUser,
})

export default rootReducer
