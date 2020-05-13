import { APP_SETTINGS_TOGGLE_AUTO_REDIRECT_IF_LOGGED_IN } from 'store/actions/app-settings'

function appSettings(
  state = {
    autoRedirectIfLoggedIn: true,
  },
  action,
) {
  switch (action.type) {
    case APP_SETTINGS_TOGGLE_AUTO_REDIRECT_IF_LOGGED_IN:
      return {
        ...state,
        autoRedirectIfLoggedIn: action.payload ?? !state.autoRedirectIfLoggedIn,
      }
    default:
      return state
  }
}

export default appSettings
