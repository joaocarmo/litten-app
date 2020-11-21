/**
 * @format
 * @flow
 */

import type {
  AppSettings,
  AuthenticatedUser,
  GenericActionObject,
  LoginForm,
  NewForm,
  ProfileForm,
  RegisterForm,
  SearchSettings,
} from './'

// The overall state of the app
export type State = {|
  +appSettings: AppSettings,
  +authenticatedUser: AuthenticatedUser,
  +formLogin: LoginForm,
  +formNew: NewForm,
  +formProfile: ProfileForm,
  +formRegister: RegisterForm,
  +searchSettings: SearchSettings,
|}

// All the actions of the app
export type Action = GenericActionObject

// type of a `dispatch()` function
export type Dispatch = (Action) => Action
