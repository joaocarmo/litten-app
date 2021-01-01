/**
 * @format
 * @flow
 */

import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { userPreferencesSelector } from 'store/selectors'
import { getUnit } from 'utils/functions'

const useUnit = (property: string): [string, boolean] => {
  const { useMetricUnits } = useSelector(userPreferencesSelector)

  const unit = useMemo(() => getUnit(property, useMetricUnits), [
    property,
    useMetricUnits,
  ])

  return [unit, useMetricUnits]
}

export default useUnit
