/**
 * @format
 * @flow
 */

import { useCallback, useState } from 'react'
import crashlytics from 'db/crashlytics'

const useCrashlytics = (): [boolean, (enabled: boolean) => void] => {
  const [crashlyticsEnabled, setCrashlyticsEnabled] = useState(
    crashlytics.isCrashlyticsCollectionEnabled,
  )

  const setCrashlyticsAsync = useCallback(async (enabled) => {
    setCrashlyticsEnabled(enabled)
    await crashlytics
      .setCrashlyticsCollectionEnabled(enabled)
      .then(() =>
        setCrashlyticsEnabled(crashlytics.isCrashlyticsCollectionEnabled),
      )
  }, [])

  const setCrashlytics = useCallback(
    (enabled) => {
      setCrashlyticsAsync(enabled)
    },
    [setCrashlyticsAsync],
  )

  return [crashlyticsEnabled, setCrashlytics]
}

export default useCrashlytics
