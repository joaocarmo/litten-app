// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ServiceOptions {}

export default class Service<T extends ServiceOptions = ServiceOptions> {
  options: T

  constructor(options: T) {
    this.options = options
  }
}
