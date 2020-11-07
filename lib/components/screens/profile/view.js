/**
 * @format
 * @flow
 */

import ScreenTemplate from 'templates/screen'
import ScreenSimpleHeaderTemplate from 'templates/screen-simple-header'
import { FlatList, StyleSheet, View } from 'react-native'
import { UIBaloon } from 'ui-elements'
import UserProfileDetailsScreen from './view-details'
import { translate } from 'utils/i18n'

const UserProfileScreen: (args: any) => React$Node = ({ route }) => {
  const littens = []
  const hasItems = littens.length > 0

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
          ListHeaderComponent={
            <UserProfileDetailsScreen user={route.params.user} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <UIBaloon type="info">
                {translate('screens.profile.viewEmptyUserPosts')}
              </UIBaloon>
            </View>
          }
          bounces={hasItems}
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
