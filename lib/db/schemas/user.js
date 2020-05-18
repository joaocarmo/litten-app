import locationSchema from './location'

export const userSchema = {
  authUuid: '',
  location: locationSchema,
  country: '',
  phoneNumber: '',
  isOrganization: false,
}
