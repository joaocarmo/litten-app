/**
 * @format
 * @flow
 */

import { Alert, Linking, Pressable, StyleSheet, View } from 'react-native'
import { UIBaloon, UIHeader, UIIcon, UIModal, UIText } from 'ui-elements'
import { contactOptions } from 'utils/litten'
import { translate } from 'utils/i18n'
import { getFromListByKey } from 'utils/functions'
import { veryElevated as veryElevatedStyle } from 'styles/common'
import colors from 'styles/colors'

const LittenContactOptions: (args: any) => React$Node = ({
  litten,
  user: userProp,
  authenticatedUserUid,
  ...otherProps
}) => {
  const user = userProp.toJSON()
  const { id: userUid, displayName } = user

  const openURL = async (url: string) => {
    if (!url) {
      return
    }

    // Check if the link is supported
    const supported = await Linking.canOpenURL(url)

    if (supported) {
      // Should open the link with some app
      await Linking.openURL(url)
    } else {
      Alert.alert(translate('screens.littenPost.cantOpenURL'))
    }
  }

  const handleContact = ({ key, urlScheme, urlValueKey }) => {
    const urlValue = user[urlValueKey]
    if (urlScheme && urlValue) {
      openURL(`${urlScheme}${urlValue}`)
    }
  }

  const renderContactOptions = () => {
    if (!litten.contactPreferences.length) {
      return (
        <UIBaloon type="info" style={styles.contactOptionsEmpty}>
          {translate('screens.littenPost.emptyContactOptions', {
            name: displayName,
          })}
        </UIBaloon>
      )
    }

    if (userUid === authenticatedUserUid) {
      return (
        <UIBaloon type="info" style={styles.contactOptionsEmpty}>
          {translate('screens.littenPost.selfContactOptions', {
            name: displayName,
          })}
        </UIBaloon>
      )
    }

    return litten.contactPreferences.map((contactOptionKey) => {
      const contactOption = getFromListByKey(contactOptions, contactOptionKey)

      if (contactOption) {
        const { key, label, icon } = contactOption

        return (
          <Pressable
            onPress={() => handleContact(contactOption)}
            style={({ pressed }) => [
              veryElevatedStyle,
              styles.contactOptionContainer,
              pressed ? styles.contactOptionContainerPressed : undefined,
            ]}
            key={key}>
            <UIText bold noPadding>
              {label}
            </UIText>
            <UIIcon icon={icon} circle selected />
          </Pressable>
        )
      }

      return null
    })
  }

  return (
    <UIModal {...otherProps}>
      <UIHeader numberOfLines={1} subheader>
        {translate('screens.littenPost.contactOptionsHeader', {
          name: displayName,
        })}
      </UIHeader>
      <View style={styles.contactOptionsContainer}>
        {renderContactOptions()}
      </View>
    </UIModal>
  )
}

export default LittenContactOptions

const styles = StyleSheet.create({
  contactOptionsContainer: {
    justifyContent: 'center',
    marginBottom: 14,
  },
  contactOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 22,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: colors.white,
  },
  contactOptionContainerPressed: {
    backgroundColor: colors.lighterBlue,
  },
  contactOptionsEmpty: {
    marginTop: 14,
  },
})
