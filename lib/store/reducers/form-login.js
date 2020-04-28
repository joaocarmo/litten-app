import {
  FORM_LOGIN_CLEAR,
  FORM_LOGIN_CLEAR_ERRORS,
  FORM_LOGIN_SET_EMAIL,
  FORM_LOGIN_SET_PASSWORD,
  FORM_LOGIN_SET_ERROR_AND_MESSAGE,
} from '../actions/form-login'

function formLogin(
  state = {
    email: '',
    password: '',
    error: {
      email: false,
      password: false,
    },
    errorMessage: {
      email: '',
      password: '',
    },
  },
  action,
) {
  switch (action.type) {
    case FORM_LOGIN_CLEAR:
      return {
        email: '',
        password: '',
      }
    case FORM_LOGIN_CLEAR_ERRORS:
      return {
        ...state,
        error: {
          email: false,
          password: false,
        },
        errorMessage: {
          email: '',
          password: '',
        },
      }
    case FORM_LOGIN_SET_EMAIL:
      return { ...state, email: action.payload }
    case FORM_LOGIN_SET_PASSWORD:
      return { ...state, password: action.payload }
    case FORM_LOGIN_SET_ERROR_AND_MESSAGE:
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload.field]: action.payload.error,
        },
        errorMessage: {
          ...state.errorMessage,
          [action.payload.field]: action.payload.errorMessage,
        },
      }
    default:
      return state
  }
}

export default formLogin