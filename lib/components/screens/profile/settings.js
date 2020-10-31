/**
 * @format
 * @flow
 */

import { useRef } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AuthenticatedUser from 'store/actions/authenticated-user'
import { SectionList, StyleSheet, View } from 'react-native'
import User from 'model/user'
import { UIHeader, UISeparator, UISwitch, UIText } from 'ui-elements'
import { translate } from 'utils/i18n'
import {
  STRUCTURE_TAB_NAV_HEIGHT,
  USER_PREFERENCES_CONTACT_CALL,
  USER_PREFERENCES_CONTACT_EMAIL,
  USER_PREFERENCES_CONTACT_INAPP,
  USER_PREFERENCES_CONTACT_SMS,
} from 'utils/constants'
import colors from 'styles/colors'

const mapStateToProps = (state) => ({
  authenticatedUser: state.authenticatedUser,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AuthenticatedUser, dispatch)

const ProfileSettingsScreen: (args: any) => React$Node = ({
  authenticatedUser,
  setContactPreferences,
  setMetricUnits,
  setShareMetrics,
}) => {
  const {
    extra: userInfo,
    preferences: { shareMetrics, useMetricUnits },
  } = authenticatedUser
  const user = useRef(new User(userInfo)).current
  const contactCall = user.contactPreferences.includes(
    USER_PREFERENCES_CONTACT_CALL,
  )
  const contactEmail = user.contactPreferences.includes(
    USER_PREFERENCES_CONTACT_EMAIL,
  )
  const contactInApp = user.contactPreferences.includes(
    USER_PREFERENCES_CONTACT_INAPP,
  )
  const contactSMS = user.contactPreferences.includes(
    USER_PREFERENCES_CONTACT_SMS,
  )
  const setContactCall = () => {
    setContactPreferences(USER_PREFERENCES_CONTACT_CALL)
    user.contactPreferences = USER_PREFERENCES_CONTACT_CALL
  }
  const setContactEmail = () => {
    setContactPreferences(USER_PREFERENCES_CONTACT_EMAIL)
    user.contactPreferences = USER_PREFERENCES_CONTACT_EMAIL
  }
  const setContactInApp = () => {
    setContactPreferences(USER_PREFERENCES_CONTACT_INAPP)
    user.contactPreferences = USER_PREFERENCES_CONTACT_INAPP
  }
  const setContactSMS = () => {
    setContactPreferences(USER_PREFERENCES_CONTACT_SMS)
    user.contactPreferences = USER_PREFERENCES_CONTACT_SMS
  }

  const userSettings = [
    {
      key: 'contactOptions',
      title: translate('screens.settings.contactOptions'),
      data: [
        {
          key: 'contactInApp',
          title: translate('screens.settings.contactInApp'),
          extra: translate('screens.settings.contactInAppDesc'),
          value: contactInApp,
          setter: setContactInApp,
        },
        {
          key: 'contactCall',
          title: translate('screens.settings.contactCall'),
          extra: translate('screens.settings.contactCallDesc'),
          value: contactCall,
          setter: setContactCall,
        },
        {
          key: 'contactSMS',
          title: translate('screens.settings.contactSMS'),
          extra: translate('screens.settings.contactSMSDesc'),
          value: contactSMS,
          setter: setContactSMS,
        },
        {
          key: 'contactEmail',
          title: translate('screens.settings.contactEmail'),
          extra: translate('screens.settings.contactEmailDesc'),
          value: contactEmail,
          setter: setContactEmail,
        },
      ],
    },
    {
      key: 'miscOptions',
      title: translate('screens.settings.miscOptions'),
      data: [
        {
          key: 'useMetricUnits',
          title: translate('screens.settings.useMetricUnits'),
          extra: null,
          value: useMetricUnits,
          setter: setMetricUnits,
        },
        {
          key: 'shareMetrics',
          title: translate('screens.settings.shareMetrics'),
          extra: translate('screens.settings.shareMetricsDesc'),
          value: shareMetrics,
          setter: setShareMetrics,
        },
      ],
    },
  ]

  const renderItem = ({ item: { title, extra, value, setter } }) => (
    <>
      <UISwitch value={value} onValueChange={setter}>
        {title}
      </UISwitch>
      {extra && (
        <UIText style={styles.extraText} noPadding>
          {extra}
        </UIText>
      )}
    </>
  )

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <UIHeader subheader>{title}</UIHeader>
    </View>
  )

  const renderSectionSeparatorComponent = ({
    trailingItem,
    trailingSection,
  }) => {
    if (!trailingItem && trailingSection) {
      return <UISeparator invisible />
    }

    return null
  }

  return (
    <SectionList
      sections={userSettings}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      SectionSeparatorComponent={renderSectionSeparatorComponent}
      ListFooterComponent={<UISeparator invisible />}
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={styles.contentContainer}
    />
  )
}

const styles = StyleSheet.create({
  sectionHeader: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  contentContainer: {
    paddingBottom: STRUCTURE_TAB_NAV_HEIGHT,
  },
  extraText: {
    marginTop: 8,
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileSettingsScreen)
