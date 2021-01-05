/**
 * @format
 * @flow
 */

import { useCallback, useMemo, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setContactPreferences as setContactPreferencesAction } from 'store/actions/authenticated-user'
import { Alert, SectionList, StyleSheet, View } from 'react-native'
import { useCrashlytics, usePaddingBottom, useUnit, useUserInfo } from 'hooks'
import User from 'model/user'
import { UIHeader, UISeparator, UISwitch } from 'ui-elements'
import { translate } from 'utils/i18n'
import {
  USER_PREFERENCES_CONTACT_CALL,
  USER_PREFERENCES_CONTACT_EMAIL,
  USER_PREFERENCES_CONTACT_INAPP,
  USER_PREFERENCES_CONTACT_SMS,
} from 'utils/constants'
import { contentContainerStyle } from 'styles/common'
import colors from 'styles/colors'

const ProfileSettingsScreen: (args: any) => React$Node = () => {
  const dispatch = useDispatch()

  const withPaddingBottom = usePaddingBottom()

  const [crashlyticsEnabled, setCrashlyticsEnabled] = useCrashlytics()
  // eslint-disable-next-line no-unused-vars
  const [_, useMetricUnits, setMetricUnits] = useUnit()
  const [userInfo] = useUserInfo()
  const user = useRef(new User(userInfo)).current

  const contactCall = useMemo(
    () => user.contactPreferences.includes(USER_PREFERENCES_CONTACT_CALL),
    [user.contactPreferences],
  )
  const contactEmail = useMemo(
    () => user.contactPreferences.includes(USER_PREFERENCES_CONTACT_EMAIL),
    [user.contactPreferences],
  )
  const contactInApp = useMemo(
    () => user.contactPreferences.includes(USER_PREFERENCES_CONTACT_INAPP),
    [user.contactPreferences],
  )
  const contactSMS = useMemo(
    () => user.contactPreferences.includes(USER_PREFERENCES_CONTACT_SMS),
    [user.contactPreferences],
  )

  const setContactPreferences = useCallback(
    (contactPreference) =>
      dispatch(setContactPreferencesAction(contactPreference)),
    [dispatch],
  )

  const hasPhoneNumber = useCallback(() => {
    if (!user.phoneNumber) {
      Alert.alert(
        translate('feedback.errorMessages.noPhoneNumberTitle'),
        translate('feedback.errorMessages.noPhoneNumberDesc'),
      )

      return false
    }

    return true
  }, [user.phoneNumber])

  const setContactCall = useCallback(() => {
    if (hasPhoneNumber()) {
      setContactPreferences(USER_PREFERENCES_CONTACT_CALL)
      user.contactPreferences = USER_PREFERENCES_CONTACT_CALL
    }
  }, [hasPhoneNumber, setContactPreferences, user])
  const setContactEmail = useCallback(() => {
    setContactPreferences(USER_PREFERENCES_CONTACT_EMAIL)
    user.contactPreferences = USER_PREFERENCES_CONTACT_EMAIL
  }, [setContactPreferences, user])
  const setContactInApp = useCallback(() => {
    setContactPreferences(USER_PREFERENCES_CONTACT_INAPP)
    user.contactPreferences = USER_PREFERENCES_CONTACT_INAPP
  }, [setContactPreferences, user])
  const setContactSMS = useCallback(() => {
    if (hasPhoneNumber()) {
      setContactPreferences(USER_PREFERENCES_CONTACT_SMS)
      user.contactPreferences = USER_PREFERENCES_CONTACT_SMS
    }
  }, [hasPhoneNumber, setContactPreferences, user])

  const userSettings = useMemo(
    () => [
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
    ],
    [
      contactCall,
      contactEmail,
      contactInApp,
      contactSMS,
      crashlyticsEnabled,
      setContactCall,
      setContactEmail,
      setContactInApp,
      setContactSMS,
      setCrashlyticsEnabled,
      setMetricUnits,
      useMetricUnits,
    ],
  )

  const renderItem = ({ item: { label, description, value, setter } }) => (
    <UISwitch
      label={label}
      description={description}
      value={value}
      onValueChange={setter}
    />
  )

  const renderSectionHeader = useCallback(
    ({ section: { label } }) => (
      <View style={styles.sectionHeader}>
        <UIHeader subheader>{label}</UIHeader>
      </View>
    ),
    [],
  )

  const renderSectionSeparatorComponent = useCallback(
    ({ trailingItem, trailingSection }) => {
      if (!trailingItem && trailingSection) {
        return <UISeparator invisible />
      }

      return null
    },
    [],
  )

  return (
    <SectionList
      sections={userSettings}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      SectionSeparatorComponent={renderSectionSeparatorComponent}
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={[contentContainerStyle, withPaddingBottom]}
    />
  )
}

const styles = StyleSheet.create({
  sectionHeader: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
})

export default ProfileSettingsScreen
