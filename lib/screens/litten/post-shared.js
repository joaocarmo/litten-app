/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useCacheLittens, useCacheUsers } from 'hooks'
import { UILoader } from 'ui-elements'
import PostScreen from 'screens/litten/post'
import Litten from 'model/litten'
import User from 'model/user'

const LittenPostSharedScreen: (args: any) => React$Node = ({
  route: {
    params: { littenUid },
  },
}) => {
  const [littens, addLitten] = useCacheLittens()
  const [users, addUser] = useCacheUsers()
  const [litten, setLitten] = useState({})
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation()

  const fetchLittenAndUser = useCallback(
    async (littenId) => {
      let sharedLitten
      if (!littens[littenId]) {
        sharedLitten = new Litten({ id: littenId })
        await sharedLitten.get()
        const newLitten = sharedLitten.toJSON()
        addLitten(newLitten)
      } else {
        sharedLitten = new Litten(littens[littenId])
      }

      let sharedUser
      if (!users[sharedLitten.userUid]) {
        sharedUser = new User({ id: sharedLitten.userUid })
        await sharedUser.get()
        const newUser = sharedUser.toJSON()
        addUser(newUser)
      } else {
        sharedUser = new User(users[sharedLitten.userUid])
      }

      setLitten(sharedLitten)
      setUser(sharedUser)
      setIsLoading(false)
    },
    [addLitten, addUser, littens, users],
  )

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
