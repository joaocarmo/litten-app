import locationSchema from './location'

export const userSchema = {
  authUuid: '',
  location: locationSchema,
  phoneNumber: '',
  isOrganization: false,
}
