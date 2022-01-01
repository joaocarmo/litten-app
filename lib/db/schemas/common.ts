export type DBTimestamp = {
  seconds?: number
  nanoseconds?: number
  _seconds?: number
  _nanoseconds?: number
}

export type DBMetadata = {
  createdAt: DBTimestamp
  updatedAt: DBTimestamp
}
