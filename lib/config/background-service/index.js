/**
 * @format
 * @flow
 */

import BackgroundFetch from 'react-native-background-fetch'
import { debugLog } from 'utils/dev'
import defaultConfig from 'config/background-service/default'

export type HeadlessEvent = { +taskId: string }

export type HeadlessTask = (event: HeadlessEvent) => void

export type BackgroundFetchStatus = 0 | 1 | 2

export type NetworkType = 0 | 1 | 2 | 3 | 4

export type AbstractConfig = {
  enableHeadless?: boolean,
  forceAlarmManager?: boolean,
  requiredNetworkType?: NetworkType,
  requiresBatteryNotLow?: boolean,
  requiresCharging?: boolean,
  requiresDeviceIdle?: boolean,
  requiresStorageNotLow?: boolean,
  startOnBoot?: boolean,
  stopOnTerminate?: boolean,
}

export type BackgroundFetchConfig = AbstractConfig & {
  minimumFetchInterval?: number,
}

export type FetchHandler = (taskId: string) => void

export type FailHandler = (status: BackgroundFetchStatus) => void

class BackgroundService {
  #customConfig
  #onBackgroundFetch
  #onBackgroundFail

  constructor(customConfig: BackgroundFetchConfig = {}) {
    this.#customConfig = customConfig
  }

  registerOnBackgroundFetch(handler: FetchHandler): void {
    this.#onBackgroundFetch = handler
  }

  registerOnBackgroundFail(handler: FailHandler): void {
    this.#onBackgroundFail = handler
  }

  onBackgroundFetch(taskId: string): void {
    if (typeof this.#onBackgroundFetch === 'function') {
      this.#onBackgroundFetch(taskId)
    }
  }

  onBackgroundFail(status: BackgroundFetchStatus): void {
    if (typeof this.#onBackgroundFail === 'function') {
      this.#onBackgroundFail(status)
    }
  }

  configure(): void {
    BackgroundFetch.configure(
      {
        ...defaultConfig,
        ...this.#customConfig,
      },
      this.onBackgroundFetch.bind(this),
      this.onBackgroundFail.bind(this),
    )
  }

  registerHeadlessTask(task: HeadlessTask): void {
    debugLog('[BACKGROUND SERVICE] registerHeadlessTask')

    BackgroundFetch.registerHeadlessTask(task)
  }

  start(): Promise<BackgroundFetchStatus> {
    debugLog('[BACKGROUND SERVICE] start')

    return BackgroundFetch.start()
  }

  finish(taskId?: string): Promise<boolean> {
    debugLog('[BACKGROUND SERVICE] stop')

    return BackgroundFetch.finish(taskId)
  }

  stop(taskId?: string): Promise<boolean> {
    debugLog('[BACKGROUND SERVICE] stop')

    return BackgroundFetch.stop(taskId)
  }

  async getStatus(): Promise<string> {
    let returnStatus = 'undetermined'

    const backgroundFetchStatus = new Promise((resolve, reject) =>
      BackgroundFetch.status(resolve),
    )

    const status = await backgroundFetchStatus

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
