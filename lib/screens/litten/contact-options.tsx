import { useCallback, useRef } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Pressable, View } from 'react-native'
import User from 'model/user'
import { useTheme } from 'hooks'
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

const LittenContactOptions = ({
  authenticatedUserUid,
  litten,
  onClickOutside,
  user: userProp,
  ...otherProps
}) => {
  const user = useRef(
    userProp instanceof User ? userProp.toJSON() : userProp,
  ).current
  const { id: userUid, displayName } = user
  const navigation = useNavigation()
  const {
    createStyles,
    commonStyles: {
      commonStyles: { veryElevated: veryElevatedStyle },
    },
  } = useTheme()
  const styles = createStyles((theme) => ({
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
      backgroundColor: theme.colors.background,
    },
    contactOptionContainerPressed: {
      backgroundColor: theme.colors.secondaryLighter,
    },
    contactOptionsEmpty: {
      marginTop: UI_ELEMENT_BORDER_MARGIN * 2,
    },
  }))
  const openInAppMessage = useCallback(() => {
    onClickOutside()
    navigation.navigate(SCREEN_MESSAGE_PRIVATE, {
      recipient: user,
      litten,
    })
  }, [litten, navigation, onClickOutside, user])
  const handleContact = useCallback(
    ({ key, urlScheme, urlValueKey }) => {
      if (urlScheme === LITTEN_URI) {
        openInAppMessage()
      } else {
        const urlValue = user[urlValueKey]

        if (urlScheme && urlValue) {
          openURL(`${urlScheme}${urlValue}`)
        }
      }
    },
    [openInAppMessage, user],
  )
  const renderContactOption = useCallback(
    (contactOption) => {
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
            key={key}
          >
            <UIText bold noPadding>
              {label}
            </UIText>
            <UIIcon IconComponent={icon} circle selected />
          </Pressable>
        )
      }

      return null
    },
    [
      handleContact,
      styles.contactOptionContainer,
      styles.contactOptionContainerPressed,
      user.contactPreferences,
      veryElevatedStyle,
    ],
  )
  const renderContactOptions = useCallback(() => {
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

    return contactOptions.map(renderContactOption)
  }, [
    authenticatedUserUid,
    displayName,
    renderContactOption,
    styles.contactOptionsEmpty,
    user?.contactPreferences?.length,
    userUid,
  ])
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
