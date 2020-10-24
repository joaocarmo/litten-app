/**
 * @format
 * @flow
 */

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthenticatedUser from 'store/actions/authenticated-user'
import { FlatList, StyleSheet, View } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import LittenCard from 'components/litten-card'
import { UIContainer, UIHeader, UIImage, UIText } from 'ui-elements'
import { placeholderEmptyFavouritePosts } from 'images'
import { getFavouriteIndex } from 'utils/functions'
import { translate } from 'utils/i18n'
import { STRUCTURE_TAB_NAV_HEIGHT } from 'utils/constants'

const FavouritePostsEmptyScreen: (args: any) => React$Node = () => (
  <View style={styles.emptyPostsContainer}>
    <UIContainer style={styles.floatContainer}>
      <UIImage
        source={placeholderEmptyFavouritePosts}
        style={styles.placeholderImage}
      />
      <UIHeader style={styles.centeredText}>
        {translate('screens.favourites.emptyPostsTitle')}
      </UIHeader>
      <UIText style={styles.centeredText}>
        {translate('screens.favourites.emptyPostsText')}
      </UIText>
    </UIContainer>
  </View>
)

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AuthenticatedUser, dispatch)

const FavouritePostsScreen: (args: any) => React$Node = ({
  authenticatedUser,
  removeFavourite,
}) => {
  const {
    saved: { favourites },
  } = authenticatedUser

  const handleOnPressAction = (item) =>
    removeFavourite(getFavouriteIndex(item, favourites))

  return (
    <View style={styles.postsContainer}>
      <FlatList
        data={favourites}
        renderItem={({ item }) => (
          <LittenCard
            litten={item}
            authenticatedUser={authenticatedUser}
            handleOnPressAction={() => handleOnPressAction(item)}
          />
        )}
        ListEmptyComponent={FavouritePostsEmptyScreen}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyPostsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatContainer: {
    alignItems: 'center',
  },
  centeredText: {
    textAlign: 'center',
  },
  placeholderImage: {
    height: vw(30),
    width: vw(30),
    margin: 20,
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavouritePostsScreen)
