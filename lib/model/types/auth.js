/**
 * @format
 * @flow
 */

import type {
  ReactNativeFirebase,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth'

export type AuthSettings = {
  avatar?: { uri: string } | null,
  callingCode?: string,
  country?: string,
  displayName?: string,
  email?: string,
  password?: string,
  phoneNumber?: string,
}

export interface AuthClass {
  constructor(authSettings: AuthSettings): void;
  _auth(app?: ReactNativeFirebase.FirebaseApp): FirebaseAuthTypes.Module;
  get userUid(): string;
}
