/**
 * @format
 * @flow
 */

import { useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setContactPreferences as setContactPreferencesAction } from 'store/actions/authenticated-user'
import { Alert, SectionList, StyleSheet, View } from 'react-native'
import { useCrashlytics, useUnit, useUserInfo } from 'hooks'
import User from 'model/user'
import { UIHeader, UISeparator, UISwitch } from 'ui-elements'
import { translate } from 'utils/i18n'
import {
  STRUCTURE_TAB_NAV_HEIGHT,
  USER_PREFERENCES_CONTACT_CALL,
  USER_PREFERENCES_CONTACT_EMAIL,
  USER_PREFERENCES_CONTACT_INAPP,
  USER_PREFERENCES_CONTACT_SMS,
} from 'utils/constants'
import colors from 'styles/colors'

const ProfileSettingsScreen: (args: any) => React$Node = () => {
  const dispatch = useDispatch()

  const [crashlyticsEnabled, setCrashlyticsEnabled] = useCrashlytics()
  // eslint-disable-next-line no-unused-vars
  const [_, useMetricUnits, setMetricUnits] = useUnit()
  const [userInfo] = useUserInfo()
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

  const setContactPreferences = useCallback(
    (contactPreference) =>
      dispatch(setContactPreferencesAction(contactPreference)),
    [dispatch],
  )

  const hasPhoneNumber = () => {
    if (!user.phoneNumber) {
      Alert.alert(
        translate('feedback.errorMessages.noPhoneNumberTitle'),
        translate('feedback.errorMessages.noPhoneNumberDesc'),
      )

      return false
    }

    return true
  }

  const setContactCall = () => {
    if (hasPhoneNumber()) {
      setContactPreferences(USER_PREFERENCES_CONTACT_CALL)
      user.contactPreferences = USER_PREFERENCES_CONTACT_CALL
    }
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
    if (hasPhoneNumber()) {
      setContactPreferences(USER_PREFERENCES_CONTACT_SMS)
      user.contactPreferences = USER_PREFERENCES_CONTACT_SMS
    }
  }

  const userSettings = [
    {
      key: 'contactOptions',
      label: translate('screens.settings.contactOptions'),
      data: [
        {
          key: 'contactInApp',
          label: translate('screens.settings.contactInApp'),
          description: translate('screens.settings.contactInAppDesc'),
          value: contactInApp,
          setter: setContactInApp,
        },
        {
          key: 'contactCall',
          label: translate('screens.settings.contactCall'),
          description: translate('screens.settings.contactCallDesc'),
          value: contactCall,
          setter: setContactCall,
        },
        {
          key: 'contactSMS',
          label: translate('screens.settings.contactSMS'),
          description: translate('screens.settings.contactSMSDesc'),
          value: contactSMS,
          setter: setContactSMS,
        },
        {
          key: 'contactEmail',
          label: translate('screens.settings.contactEmail'),
          description: translate('screens.settings.contactEmailDesc'),
          value: contactEmail,
          setter: setContactEmail,
        },
      ],
    },
    {
      key: 'miscOptions',
      label: translate('screens.settings.miscOptions'),
      data: [
        {
          key: 'useMetricUnits',
          label: translate('screens.settings.useMetricUnits'),
          description: null,
          value: useMetricUnits,
          setter: setMetricUnits,
        },
        {
          key: 'shareMetrics',
          label: translate('screens.settings.shareMetrics'),
          description: translate('screens.settings.shareMetricsDesc'),
          value: crashlyticsEnabled,
          setter: setCrashlyticsEnabled,
        },
      ],
    },
  ]

  const renderItem = ({ item: { label, description, value, setter } }) => (
    <UISwitch
      label={label}
      description={description}
      value={value}
      onValueChange={setter}
    />
  )

  const renderSectionHeader = ({ section: { label } }) => (
    <View style={styles.sectionHeader}>
      <UIHeader subheader>{label}</UIHeader>
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
})

export default ProfileSettingsScreen
