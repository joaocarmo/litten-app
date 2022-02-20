import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useFavouriteFn, useUserPosts, useUserUid } from '@hooks'
import Search from '@model/search'
import LittenSmartCard from '@components/litten-card/smart'
import ScreenTemplate from '@templates/screen'
import ScreenSimpleHeaderTemplate from '@templates/screen-simple-header'
import { FlatList, StyleSheet, View } from 'react-native'
import { UIBalloon, UISeparator } from '@ui-elements'
import UserProfileDetailsScreen from '@screens/profile/view-details'
import { translate } from '@utils/i18n'

const UserProfileScreen = ({
  route: {
    params: { user },
  },
}) => {
  const [littens, setLittens] = useState([])
  const userUid = useUserUid()
  const [activePosts] = useUserPosts()
  const [, toggleFavourite] = useFavouriteFn()

  const search = useRef(
    new Search({
      user,
    }),
  ).current

  const getUserActivePosts = useCallback(async () => {
    const userPosts = await search.userActivePosts()
    setLittens(userPosts)
  }, [search])

  useEffect(() => {
    if (user.id === userUid) {
      setLittens(activePosts)
    } else {
      getUserActivePosts()
    }
  }, [activePosts, getUserActivePosts, user.id, userUid])

  const renderItem = useCallback(
    ({ item }) => (
      <LittenSmartCard litten={item} onPressAction={toggleFavourite} />
    ),
    [toggleFavourite],
  )

  const ListHeaderComponent = useMemo(
    () => <UserProfileDetailsScreen user={user} />,
    [user],
  )

  const ListFooterComponent = useMemo(() => <UISeparator invisible />, [])

  const ListEmptyComponent = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <UIBalloon type="info">
          {translate('screens.profile.viewEmptyUserPosts')}
        </UIBalloon>
      </View>
    ),
    [],
  )

  return (
    <ScreenTemplate
      header={
        <ScreenSimpleHeaderTemplate withGoBack>
          {translate('screens.profile.view')}
        </ScreenSimpleHeaderTemplate>
      }
    >
      <View style={styles.resultsContainer}>
        <FlatList
          data={littens}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={ListEmptyComponent}
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 32,
  },
})

export default UserProfileScreen
