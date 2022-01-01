import { useCallback, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useCacheLittens, useCacheUsers } from '@hooks'
import { UILoader } from '@ui-elements'
import PostScreen from '@screens/litten/post'
import Litten from '@model/litten'
import User from '@model/user'
import { debugLog } from '@utils/dev'

const LittenPostSharedScreen = ({
  route: {
    params: { littenUid: littenUidProp },
  },
}) => {
  const [littenUid, setLittenUid] = useState(littenUidProp)
  const [getLitten] = useCacheLittens()
  const [getUser] = useCacheUsers()
  const [litten, setLitten] = useState({})
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation()

  const fetchLittenAndUser = useCallback(
    async (littenId) => {
      const sharedLittenObject = await getLitten(littenId)

      if (sharedLittenObject && sharedLittenObject.userUid) {
        debugLog('[SHARED] Litten was found')
        const sharedLitten = new Litten(sharedLittenObject)
        const sharedUser = new User(await getUser(sharedLitten.userUid))
        setLitten(sharedLitten)
        setUser(sharedUser)
      } else {
        debugLog('[SHARED] Litten is missing')
        setLittenUid('')
      }

      setIsLoading(false)
    },
    [getLitten, getUser],
  )

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

  if (isLoading) {
    return <UILoader active={isLoading} size="large" />
  }

  return (
    <PostScreen
      route={{
        params: {
          litten,
          user,
        },
      }}
    />
  )
}

export default LittenPostSharedScreen
