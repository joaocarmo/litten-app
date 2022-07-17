import { useCallback, useMemo, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Pressable, View } from 'react-native'
import type { GestureResponderEvent } from 'react-native'
import User from '@model/user'
import { useTheme } from '@hooks'
import { UIBalloon, UIHeader, UIIcon, UIModal, UIText } from '@ui-elements'
import { contactOptions } from '@utils/litten'
import { translate } from '@utils/i18n'
import { openURL } from '@utils/ui'
import { shortenName } from '@utils/functions'
import {
  LITTEN_URI,
  SCREEN_MESSAGE_PRIVATE,
  STRUCTURE_TEMPLATE_SCREEN_PADDING,
  UI_ELEMENT_BORDER_MARGIN,
} from '@utils/constants'
import type { BasicLitten } from '@model/types/litten'
import type { BasicUser } from '@model/types/user'
import type { UIModalProps } from '@ui-elements/modal'
import type { ListOfContactOptions } from '@utils/types/litten'
import type { LittenContactOptionsNavigationProp } from '@utils/types/routes'

export type LittenContactOptionsProps = {
  authenticatedUserUid: string
  litten: BasicLitten
  user: BasicUser
} & UIModalProps

const LittenContactOptions = ({
  authenticatedUserUid,
  litten,
  onClickOutside,
  user: userProp,
  ...otherProps
}: LittenContactOptionsProps) => {
  const user: BasicUser = useRef(
    userProp instanceof User ? userProp.toJSON() : userProp,
  ).current
  const { id: userUid, contactPreferences, displayName } = user
  const contactPreferencesEnabled = useMemo(
    () => Object.values(contactPreferences).filter(Boolean).length > 0,
    [contactPreferences],
  )
  const navigation = useNavigation<LittenContactOptionsNavigationProp>()
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

  const openInAppMessage = useCallback(
    (e: GestureResponderEvent) => {
      onClickOutside(e)

      navigation.navigate(SCREEN_MESSAGE_PRIVATE, {
        recipient: user,
        litten,
      })
    },
    [litten, navigation, onClickOutside, user],
  )

  const handleContact = useCallback(
    (
      e: GestureResponderEvent,
      { urlScheme, urlValueKey }: ListOfContactOptions,
    ) => {
      if (urlScheme === LITTEN_URI) {
        openInAppMessage(e)
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
    (contactOption: ListOfContactOptions) => {
      const { key, label, icon } = contactOption

      if (!contactPreferences?.[key]) {
        return null
      }

      return (
        <Pressable
          onPress={(e) => handleContact(e, contactOption)}
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
    },
    [
      contactPreferences,
      handleContact,
      styles.contactOptionContainer,
      styles.contactOptionContainerPressed,
      veryElevatedStyle,
    ],
  )

  const renderContactOptions = useCallback(() => {
    if (!contactPreferencesEnabled) {
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
    contactPreferencesEnabled,
    displayName,
    renderContactOption,
    styles.contactOptionsEmpty,
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
