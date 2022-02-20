import {
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
} from '@store/types'

// The overall state of the app
export type State = {
  readonly appSettings: AppSettings
  readonly authenticatedUser: AuthenticatedUser
  readonly cache: Cache
  readonly chats: Chats
  readonly formLogin: LoginForm
  readonly formNew: NewForm
  readonly formProfile: ProfileForm
  readonly formRegister: RegisterForm
  readonly formReport: ReportForm
  readonly searchSettings: SearchSettings
}

// All the actions of the app
export type Action = GenericActionObject

// type of a `dispatch()` function
export type Dispatch = (arg0: Action) => Action
