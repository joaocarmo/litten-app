/**
 * @format
 * @flow
 */

import { useCallback, useState } from 'react'
import analytics from 'db/analytics'
import crashlytics from 'db/crashlytics'

const useCrashlytics = (): [boolean, (enabled: boolean) => void] => {
  const [crashlyticsEnabled, setCrashlyticsEnabled] = useState(
    crashlytics.isCrashlyticsCollectionEnabled,
  )

  const setCrashlyticsAsync = useCallback(async (enabled) => {
    setCrashlyticsEnabled(enabled)

    await crashlytics.setCrashlyticsCollectionEnabled(enabled)
    await analytics.setAnalyticsCollectionEnabled(enabled)
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
