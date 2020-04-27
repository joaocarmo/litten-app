import {
  AUTH_USER_CLEAR_INFO,
  AUTH_USER_SET_BASIC,
} from '../actions/authenticated-user'

function authenticatedUser(
  state = {
    basic: null,
  },
  action,
) {
  switch (action.type) {
    case AUTH_USER_CLEAR_INFO:
      return { ...state, basic: null }
    case AUTH_USER_SET_BASIC:
      return { ...state, basic: action.payload }
    default:
      return state
  }
}

export default authenticatedUser
