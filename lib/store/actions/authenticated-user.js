export const AUTH_USER_SET_JWT = 'AUTH_USER_SET_JWT'

export function setJwt(jwt) {
  return {
    type: AUTH_USER_SET_JWT,
    payload: jwt,
  }
}
