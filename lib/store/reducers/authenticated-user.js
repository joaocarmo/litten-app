import { AUTH_USER_SET_JWT } from '../actions/authenticated-user'

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

export default authenticatedUser
