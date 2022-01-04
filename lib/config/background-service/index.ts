/* eslint-disable class-methods-use-this */
import BackgroundFetch from 'react-native-background-fetch'
import type {
  BackgroundFetchConfig,
  BackgroundFetchStatus,
  HeadlessEvent,
} from 'react-native-background-fetch'
import defaultConfig from '@config/background-service/default'
import { debugLog } from '@utils/dev'

export type FailHandler = (status: BackgroundFetchStatus) => void
export type FetchHandler = (taskId: string) => void
export type HeadlessTask = (event: HeadlessEvent) => void
export type TimeoutHandler = (taskId: string) => void

class BackgroundService {
  #customConfig

  #headlessTaskRegistered = false

  #onBackgroundFail

  #onBackgroundFetch

  #onBackgroundTimeout

  constructor(customConfig: BackgroundFetchConfig = {}) {
    this.#customConfig = customConfig
  }

  registerOnBackgroundFetch(handler: FetchHandler) {
    this.#onBackgroundFetch = handler
  }

  registerOnBackgroundFail(handler: FailHandler) {
    this.#onBackgroundFail = handler
  }

  registerOnBackgroundTimeout(handler: TimeoutHandler) {
    this.#onBackgroundTimeout = handler
  }

  onBackgroundFetch(taskId: string) {
    if (typeof this.#onBackgroundFetch === 'function') {
      this.#onBackgroundFetch(taskId)
    }
  }

  onBackgroundFail(status: BackgroundFetchStatus) {
    if (typeof this.#onBackgroundFail === 'function') {
      this.#onBackgroundFail(status)
    }
  }

  onBackgroundTimeout(taskId: string) {
    if (typeof this.#onBackgroundTimeout === 'function') {
      this.#onBackgroundTimeout(taskId)
    }
  }

  async configure() {
    const status = await BackgroundFetch.configure(
      { ...defaultConfig, ...this.#customConfig },
      this.onBackgroundFetch.bind(this),
      this.onBackgroundTimeout.bind(this),
    )

    if (status !== BackgroundFetch.STATUS_AVAILABLE) {
      this.onBackgroundFail(status)
    }
  }

  registerHeadlessTask(task: HeadlessTask) {
    debugLog('[BACKGROUND SERVICE] registerHeadlessTask')

    if (!this.#headlessTaskRegistered) {
      BackgroundFetch.registerHeadlessTask(task)
      this.#headlessTaskRegistered = true
    }
  }

  start() {
    debugLog('[BACKGROUND SERVICE] start')
    return BackgroundFetch.start()
  }

  finish(taskId?: string) {
    debugLog('[BACKGROUND SERVICE] stop')
    return BackgroundFetch.finish(taskId)
  }

  stop(taskId?: string) {
    debugLog('[BACKGROUND SERVICE] stop', taskId)
    return BackgroundFetch.stop(taskId)
  }

  async getStatus() {
    let returnStatus = 'undetermined'
    const backgroundFetchStatus = () =>
      new Promise<string>((resolve) => {
        BackgroundFetch.status(resolve)
      })
    const status = await backgroundFetchStatus()

    switch (status) {
      case BackgroundFetch.STATUS_RESTRICTED:
        returnStatus = 'restricted'
        break

      case BackgroundFetch.STATUS_DENIED:
        returnStatus = 'denied'
        break

      case BackgroundFetch.STATUS_AVAILABLE:
        returnStatus = 'enabled'
        break
    }

    return returnStatus
  }
}

export default BackgroundService

export type BackgroundServiceType = typeof BackgroundService
