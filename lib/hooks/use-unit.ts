import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userPreferencesSelector } from '@store/selectors'
import { setMetricUnits } from '@store/actions/authenticated-user'
import { getUnit } from '@utils/functions'

const useUnit = (
  property = '',
): [string, boolean, (useMetric: boolean) => void] => {
  const dispatch = useDispatch()
  const { useMetricUnits } = useSelector(userPreferencesSelector)
  const unit = useMemo(
    () => getUnit(property, useMetricUnits),
    [property, useMetricUnits],
  )
  const setNewMetricUnits = useCallback(
    (useMetric) => {
      dispatch(setMetricUnits(useMetric))
    },
    [dispatch],
  )
  return [unit, useMetricUnits, setNewMetricUnits]
}

export default useUnit
