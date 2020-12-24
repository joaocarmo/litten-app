/**
 * @format
 * @flow
 */

import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet, View } from 'react-native'
import { UIBalloon, UIHeader, UIIcon, UIModal, UIText } from 'ui-elements'
import { contactOptions } from 'utils/litten'
import { translate } from 'utils/i18n'
import { openURL } from 'utils/ui'
import { shortenName } from 'utils/functions'
import {
  LITTEN_URI,
  SCREEN_MESSAGE_PRIVATE,
  STRUCTURE_TEMPLATE_SCREEN_PADDING,
  UI_ELEMENT_BORDER_MARGIN,
} from 'utils/constants'
import { veryElevated as veryElevatedStyle } from 'styles/common'
import colors from 'styles/colors'

const LittenContactOptions: (args: any) => React$Node = ({
  authenticatedUserUid,
  litten,
  onClickOutside,
  user: userProp,
  ...otherProps
}) => {
  const user =
    typeof userProp?.toJSON === 'function' ? userProp.toJSON() : userProp
  const { id: userUid, displayName } = user

  const navigation = useNavigation()

  const openInAppMessage = () => {
    onClickOutside()
    navigation.navigate(SCREEN_MESSAGE_PRIVATE, {
      recipient: user,
      litten,
    })
  }

  const handleContact = ({ key, urlScheme, urlValueKey }) => {
    if (urlScheme === LITTEN_URI) {
      openInAppMessage()
    } else {
      const urlValue = user[urlValueKey]
      if (urlScheme && urlValue) {
        openURL(`${urlScheme}${urlValue}`)
      }
    }
  }

  const renderContactOptions = () => {
    if (!user?.contactPreferences?.length) {
      return (
        <UIBalloon type="info" style={styles.contactOptionsEmpty}>
          {translate('screens.littenPost.emptyContactOptions', {
            name: displayName,
          })}
        </UIBalloon>
      )
    }

    if (userUid === authenticatedUserUid) {
      return (
        <UIBalloon type="info" style={styles.contactOptionsEmpty}>
          {translate('screens.littenPost.selfContactOptions', {
            name: displayName,
          })}
        </UIBalloon>
      )
    }

    return contactOptions.map((contactOption) => {
      const { key, label, icon } = contactOption

      if (user.contactPreferences.includes(key)) {
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
            <UIIcon IconComponent={icon} circle selected />
          </Pressable>
        )
      }

      return null
    })
  }

  return (
    <UIModal onClickOutside={onClickOutside} {...otherProps}>
      <UIHeader numberOfLines={1} subheader>
        {translate('screens.littenPost.contactOptionsHeader', {
          name: shortenName(displayName),
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
    marginBottom: UI_ELEMENT_BORDER_MARGIN * 2,
  },
  contactOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: STRUCTURE_TEMPLATE_SCREEN_PADDING,
    borderRadius: 12,
    marginTop: UI_ELEMENT_BORDER_MARGIN,
    marginBottom: UI_ELEMENT_BORDER_MARGIN,
    backgroundColor: colors.white,
  },
  contactOptionContainerPressed: {
    backgroundColor: colors.lighterBlue,
  },
  contactOptionsEmpty: {
    marginTop: UI_ELEMENT_BORDER_MARGIN * 2,
  },
})
