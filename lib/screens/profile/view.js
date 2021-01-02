/**
 * @format
 * @flow
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { useFavourites, useUserPosts, useUserUid } from 'hooks'
import Search from 'model/search'
import LittenSmartCard from 'components/litten-card/smart'
import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import { FlatList, StyleSheet, View } from 'react-native'
import { UIBalloon, UISeparator } from 'ui-elements'
import UserProfileDetailsScreen from 'screens/profile/view-details'
import { getFavouriteIndex } from 'utils/functions'
import { translate } from 'utils/i18n'

const UserProfileScreen: (args: any) => React$Node = ({
  route: {
    params: { user },
  },
}) => {
  const [littens, setLittens] = useState([])

  const userUid = useUserUid()
  const [activePosts] = useUserPosts()
  const [favourites, addFavourite, removeFavourite] = useFavourites()

  const search = useRef(new Search({ user })).current

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

  const handleOnPressAction = (item) => {
    const favouriteIndex = getFavouriteIndex(item, favourites)
    if (favouriteIndex < 0) {
      addFavourite(item)
    } else {
      removeFavourite(favouriteIndex)
    }
  }

  return (
    <ScreenTemplate
      header={
        <ScreenSimpleHeaderTemplate withGoBack>
          {translate('screens.profile.view')}
        </ScreenSimpleHeaderTemplate>
      }>
      <View style={styles.resultsContainer}>
        <FlatList
          data={littens}
          renderItem={({ item }) => (
            <LittenSmartCard
              litten={item}
              handleOnPressAction={() => handleOnPressAction(item)}
            />
          )}
          ListHeaderComponent={<UserProfileDetailsScreen user={user} />}
          ListFooterComponent={<UISeparator invisible />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <UIBalloon type="info">
                {translate('screens.profile.viewEmptyUserPosts')}
              </UIBalloon>
            </View>
          }
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
