/**
 * @format
 * @flow
 */

import type {
  AppSettings,
  AuthenticatedUser,
  Cache,
  Chats,
  GenericActionObject,
  LoginForm,
  NewForm,
  ProfileForm,
  RegisterForm,
  ReportForm,
  SearchSettings,
} from './'

// The overall state of the app
export type State = {|
  +appSettings: AppSettings,
  +authenticatedUser: AuthenticatedUser,
  +cache: Cache,
  +chats: Chats,
  +formLogin: LoginForm,
  +formNew: NewForm,
  +formProfile: ProfileForm,
  +formRegister: RegisterForm,
  +formReport: ReportForm,
  +searchSettings: SearchSettings,
|}

// All the actions of the app
export type Action = GenericActionObject

// type of a `dispatch()` function
export type Dispatch = (Action) => Action
