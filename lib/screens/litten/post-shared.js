/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UILoader } from 'ui-elements'
import PostScreen from 'screens/litten/post'
import Litten from 'model/litten'
import User from 'model/user'

const LittenPostSharedScreen: (args: any) => React$Node = ({
  route: {
    params: { littenUid },
  },
}) => {
  const [litten, setLitten] = useState({})
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation()

  const fetchLittenAndUser = useCallback(async (littenId) => {
    const sharedLitten = new Litten({ id: littenId })
    await sharedLitten.get()

    const sharedUser = new User({ id: sharedLitten.userUid })
    await sharedUser.get()

    setLitten(sharedLitten)
    setUser(sharedUser)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (littenUid) {
      fetchLittenAndUser(littenUid)
    } else {
      navigation.goBack()
    }
  }, [fetchLittenAndUser, littenUid, navigation])

  if (isLoading) {
    return <UILoader active={isLoading} size="large" />
  }

  return <PostScreen route={{ params: { litten, user } }} />
}

export default LittenPostSharedScreen
