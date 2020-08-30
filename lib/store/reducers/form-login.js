/**
 * @format
 * @flow
 */

import type {
  ErrorAction,
  LoginForm,
  GenericActionObject,
  GenericActionCreator,
} from 'store/types'
import {
  FORM_LOGIN_CLEAR,
  FORM_LOGIN_CLEAR_ERRORS,
  FORM_LOGIN_SET_EMAIL,
  FORM_LOGIN_SET_PASSWORD,
  FORM_LOGIN_SET_ERROR_AND_MESSAGE,
} from 'store/actions/form-login'

function formLogin(
  state: LoginForm = {
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
  action: GenericActionObject | GenericActionCreator<ErrorAction>,
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
          [action.payload.field]: action.payload?.error,
        },
        errorMessage: {
          ...state.errorMessage,
          [action.payload.field]: action.payload?.errorMessage,
        },
      }
    default:
      return state
  }
}

export default formLogin
