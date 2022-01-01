export interface AuthSettings {
  id?: string
  photoURL?: string
  callingCode?: string
  country?: string
  displayName?: string
  email?: string
  password?: string
  phoneNumber?: string
  [key: string]: unknown
}
