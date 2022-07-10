import { useCallback, useMemo, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Alert, SectionList, View } from 'react-native'
import { setContactPreferences as setContactPreferencesAction } from '@store/actions/authenticated-user'
import {
  useCrashlytics,
  usePaddingBottom,
  useTheme,
  useUnit,
  useUserInfo,
} from '@hooks'
import User from '@model/user'
import { UIHeader, UIOption, UISeparator, UISwitch } from '@ui-elements'
import { themeOptions } from '@utils/litten'
import { translate } from '@utils/i18n'
import {
  USER_PREFERENCES_CONTACT_CALL,
  USER_PREFERENCES_CONTACT_EMAIL,
  USER_PREFERENCES_CONTACT_INAPP,
  USER_PREFERENCES_CONTACT_SMS,
} from '@utils/constants'

type UserSettings = ReadonlyArray<{
  key: string
  label: string
  data: any[]
}>

const renderItem = ({ item: { items, label, description, value, setter } }) => {
  if (items) {
    return (
      <UIOption
        items={items}
        label={label}
        description={description}
        selectedValue={value}
        onValueChange={setter}
      />
    )
  }

  return (
    <UISwitch
      label={label}
      description={description}
      value={value}
      onValueChange={setter}
    />
  )
}

const ProfileSettingsScreen = () => {
  const dispatch = useDispatch()
  const withPaddingBottom = usePaddingBottom()
  const [crashlyticsEnabled, setCrashlyticsEnabled] = useCrashlytics()
  const [, useMetricUnits, setMetricUnits] = useUnit()
  const [userInfo] = useUserInfo()
  const user = useRef(new User(userInfo)).current
  const {
    createStyles,
    commonStyles: {
      commonStyles: { contentContainerStyle },
    },
    setTheme,
    userScheme,
  } = useTheme()

  const styles = createStyles((theme) => ({
    sectionHeader: {
      flex: 1,
      backgroundColor: theme.colors.neutralLight,
    },
  }))

  const contactCall = useMemo(
    () => user.contactPreferences[USER_PREFERENCES_CONTACT_CALL],
    [user.contactPreferences],
  )

  const contactEmail = useMemo(
    () => user.contactPreferences[USER_PREFERENCES_CONTACT_EMAIL],
    [user.contactPreferences],
  )

  const contactInApp = useMemo(
    () => user.contactPreferences[USER_PREFERENCES_CONTACT_INAPP],
    [user.contactPreferences],
  )

  const contactSMS = useMemo(
    () => user.contactPreferences[USER_PREFERENCES_CONTACT_SMS],
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

  const userSettings: UserSettings = useMemo(
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
            key: 'theme',
            items: themeOptions,
            label: translate('screens.settings.theme'),
            description: translate('screens.settings.themeDesc'),
            value: userScheme,
            setter: setTheme,
          },
          {
            key: 'useMetricUnits',
            label: translate('screens.settings.useMetricUnits'),
            description: translate('screens.settings.useMetricUnitsDesc'),
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
      setTheme,
      useMetricUnits,
      userScheme,
    ],
  )

  const renderSectionHeader = useCallback(
    ({ section: { label } }) => (
      <View style={styles.sectionHeader}>
        <UIHeader subheader>{label}</UIHeader>
      </View>
    ),
    [styles.sectionHeader],
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

export default ProfileSettingsScreen
