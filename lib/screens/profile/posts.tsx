import { useCallback, useMemo, useState, useRef } from 'react'

import { useActionSheet } from '@expo/react-native-action-sheet'
import { usePaddingBottom, useTheme, useUserInfo, useUserPosts } from '@hooks'
import { Alert, FlatList, View } from 'react-native'
import Search from '@model/search'
import Empty from '@components/empty'
import LittenDumbCard from '@components/litten-card/dumb'
import { placeholderEmptyUserPosts } from '@images'
import { UILoader } from '@ui-elements'
import { translate } from '@utils/i18n'

const ProfilePosts = ({ active }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [user] = useUserInfo()
  const [activePosts, pastPosts, setActivePosts, setPastPosts] = useUserPosts()
  const { showActionSheetWithOptions } = useActionSheet()
  const withPaddingBottom = usePaddingBottom()
  const {
    commonStyles: {
      commonStyles: { contentContainerStyle, flexOne },
    },
  } = useTheme()
  const posts = active ? activePosts : pastPosts
  const search = useRef(
    new Search({
      user,
    }),
  ).current
  const updatePosts = useCallback(async () => {
    const userActivePosts = await search.userActivePosts()
    setActivePosts(userActivePosts)
    const userInactivePosts = await search.userInactivePosts()
    setPastPosts(userInactivePosts)
  }, [search, setActivePosts, setPastPosts])
  const toggleActive = useCallback(
    async (litten) => {
      setIsLoading(true)

      if (active) {
        await litten.archive()
      } else {
        await litten.activate()
      }

      await updatePosts()
      setIsLoading(false)
    },
    [active, updatePosts],
  )
  const deleteLitten = useCallback(
    async (litten) => {
      setIsLoading(true)
      await litten.delete()
      await updatePosts()
      setIsLoading(false)
    },
    [updatePosts],
  )
  const confirmDelete = useCallback(
    (item) => {
      const { title } = item
      Alert.alert(
        translate('cta.deleteLitten'),
        translate('feedback.confirmMessages.deleteLitten', {
          title,
        }),
        [
          {
            text: translate('cta.yes'),
            onPress: () => deleteLitten(item),
            style: 'destructive',
          },
          {
            text: translate('cta.no'),
            onPress: () => null,
          },
        ],
      )
    },
    [deleteLitten],
  )
  const handleOnPressAction = useCallback(
    (item) => {
      const options = [
        active
          ? translate('screens.profile.postsMarkInactive')
          : translate('screens.profile.postsMarkActive'),
        translate('screens.profile.postsDelete'),
        translate('cta.cancel'),
      ]
      showActionSheetWithOptions(
        {
          options,
          destructiveButtonIndex: 1,
          cancelButtonIndex: options.length - 1,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            toggleActive(item)
          } else if (buttonIndex === 1) {
            confirmDelete(item)
          }
        },
      )
    },
    [active, confirmDelete, showActionSheetWithOptions, toggleActive],
  )
  const renderItem = useCallback(
    ({ item: litten }) => (
      <LittenDumbCard
        item={{
          litten,
          user,
        }}
        onPressAction={handleOnPressAction}
        editable
      />
    ),
    [handleOnPressAction, user],
  )
  const ListEmptyComponent = useMemo(
    () => (
      <Empty
        imageSource={placeholderEmptyUserPosts}
        header={translate('screens.profile.postsEmptyTitle', {
          activeOrArchived: active
            ? translate('screens.profile.postsEmptyTitleActive')
            : translate('screens.profile.postsEmptyTitleArchived'),
        })}
      >
        {translate('screens.profile.postsEmptyText', {
          createOrArchive: active
            ? translate('screens.profile.postsEmptyTextCreate')
            : translate('screens.profile.postsEmptyTextArchive'),
        })}
      </Empty>
    ),
    [active],
  )
  return (
    <View style={flexOne}>
      <UILoader active={isLoading} transparent />
      <FlatList
        data={posts}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={[contentContainerStyle, withPaddingBottom]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </View>
  )
}

export default ProfilePosts
