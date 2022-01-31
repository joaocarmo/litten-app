import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import * as resetStore from '@store/actions/reset'

const useStore = () => {
  const dispatch = useDispatch()

  const reset = useCallback(() => {
    dispatch(resetStore.resetAppSettings())
    dispatch(resetStore.resetAuthenticatedUser())
    dispatch(resetStore.resetCache())
    dispatch(resetStore.resetChats())
    dispatch(resetStore.resetFormLogin())
    dispatch(resetStore.resetFormNew())
    dispatch(resetStore.resetFormProfile())
    dispatch(resetStore.resetFormRegister())
    dispatch(resetStore.resetFormReport())
    dispatch(resetStore.resetSearchSettings())
  }, [dispatch])

  return { reset }
}

export default useStore
