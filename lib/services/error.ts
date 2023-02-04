export class ServiceError extends Error {
  constructor(...args: string[]) {
    super(...args)

    // Maintains proper stack trace for where the error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServiceError)
    }

    this.name = 'ServiceError'
  }
}
