/**
 * @format
 * @flow
 */

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
  get userUid(): string;
}
