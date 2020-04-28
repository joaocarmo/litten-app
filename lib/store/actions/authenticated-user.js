export const AUTH_USER_CLEAR_INFO = 'AUTH_USER_CLEAR_INFO'
export const AUTH_USER_SET_BASIC = 'AUTH_USER_SET_BASIC'

export function clearInfo() {
  return {
    type: AUTH_USER_CLEAR_INFO,
  }
}

export function setBasic(basicInfo) {
  return {
    type: AUTH_USER_SET_BASIC,
    payload: basicInfo,
  }
}
