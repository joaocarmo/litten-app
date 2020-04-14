import {
  FORM_REGISTER_SET_FULL_NAME,
  FORM_REGISTER_SET_EMAIL,
  FORM_REGISTER_SET_PASSWORD,
  FORM_REGISTER_SET_PASSWORD_CONFIRM,
  FORM_REGISTER_SET_COUNTRY,
  FORM_REGISTER_SET_CALLING_CODE,
  FORM_REGISTER_SET_PHONE_NUMBER,
  FORM_REGISTER_SET_AVATAR,
} from '../actions/form-register'

function formRegister(
  state = {
    fullName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    country: '',
    callingCode: '',
    phoneNumber: '',
    avatar: '',
  },
  action,
) {
  switch (action.type) {
    case FORM_REGISTER_SET_FULL_NAME:
      return { ...state, fullName: action.payload }
    case FORM_REGISTER_SET_EMAIL:
      return { ...state, email: action.payload }
    case FORM_REGISTER_SET_PASSWORD:
      return { ...state, password: action.payload }
    case FORM_REGISTER_SET_PASSWORD_CONFIRM:
      return { ...state, passwordConfirm: action.payload }
    case FORM_REGISTER_SET_COUNTRY:
      return { ...state, country: action.payload }
    case FORM_REGISTER_SET_CALLING_CODE:
      return { ...state, callingCode: action.payload }
    case FORM_REGISTER_SET_PHONE_NUMBER:
      return { ...state, phoneNumber: action.payload }
    case FORM_REGISTER_SET_AVATAR:
      return { ...state, avatar: action.payload }
    default:
      return state
  }
}

export default formRegister
