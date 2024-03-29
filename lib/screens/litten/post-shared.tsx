import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UILoader } from '@ui-elements'
import PostScreen from '@screens/litten/post'
import Litten from '@model/litten'
import User from '@model/user'
import { debugLog } from '@utils/dev'
import type { LittenPostSharedScreenProps } from '@utils/types/routes'

const LittenPostSharedScreen = ({
  route: {
    params: { littenUid: littenUidProp },
  },
}: LittenPostSharedScreenProps) => {
  const [littenUid, setLittenUid] = useState(littenUidProp)
  const [litten, setLitten] = useState({})
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation()

  const fetchLittenAndUser = useCallback(async (littenId) => {
    const sharedLittenObject = new Litten({ id: littenId })
    await sharedLittenObject.get()

    if (sharedLittenObject && sharedLittenObject.userUid) {
      debugLog('[SHARED] Litten was found')
      const sharedLitten = new Litten(sharedLittenObject)
      const sharedUser = new User({ id: sharedLitten.userUid })
      await sharedUser.get()
      setLitten(sharedLitten)
      setUser(sharedUser)
    } else {
      debugLog('[SHARED] Litten is missing')
      setLittenUid('')
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (littenUid) {
      fetchLittenAndUser(littenUid)
    } else {
      navigation.goBack()
    }
  }, [fetchLittenAndUser, littenUid, navigation])

  useEffect(() => {
    setLittenUid(littenUidProp)
  }, [littenUidProp])

  const route = useMemo(
    () => ({
      params: {
        litten,
        user,
      },
    }),
    [litten, user],
  )

  if (isLoading) {
    return <UILoader active={isLoading} size="large" />
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore FIXEME
  return <PostScreen route={route} />
}

export default LittenPostSharedScreen
