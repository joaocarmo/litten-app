import { useCallback } from 'react'
import Toast from 'react-native-simple-toast'
import { Platform, Pressable, Share, StyleSheet, View } from 'react-native'
import { useTheme } from '@hooks'
import { Share as ShareIcon } from '@images/components/icons'
import { buildShareURI } from '@utils/functions'
import { debugLog, logError } from '@utils/dev'
import {
  RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
  STRUCTURE_SHARE_BUTTON_SIZE,
} from '@utils/constants'
import { translate } from '@utils/i18n'
import { littenTypesKeys } from '@utils/litten'

const ShareComponent = ({ filler = false, litten }) => {
  const {
    theme: { colors },
  } = useTheme()
  const shareLitten = useCallback(async () => {
    const uri = buildShareURI(litten)
    const typeKey = littenTypesKeys[litten.type]
    const message: string = translate(`screens.littenPost.${typeKey}.share`, {
      name: litten.title,
      uri: Platform.OS === 'android' ? uri : '',
    })

    try {
      const result = await Share.share({
        message,
        title: translate(`screens.littenPost.${typeKey}.shareTitle`),
        url: Platform.OS === 'ios' ? uri : undefined,
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // iOS shared with activity type of result.activityType
          debugLog('[SHARING] SHARED WITH', result.activityType)
        } else {
          // Android shared
          debugLog('[SHARING] SHARED')
        }
      } else if (result.action === Share.dismissedAction) {
        // iOS-only dismissed
        debugLog('[SHARING] DISMISSED')
      }
    } catch (err) {
      logError(err)
    }
  }, [litten])

  const handleOnShare = useCallback(() => {
    if (litten.id && litten.title) {
      shareLitten()
    } else {
      Toast.show(translate('feedback.errorMessages.littenPostMissing'))
    }
  }, [litten, shareLitten])

  if (filler) {
    return <View style={styles.shareContainer} />
  }

  return (
    <Pressable onPress={handleOnShare} style={styles.shareContainer}>
      <ShareIcon
        width={STRUCTURE_SHARE_BUTTON_SIZE}
        height={STRUCTURE_SHARE_BUTTON_SIZE}
        fill={colors.textAlt}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  shareContainer: {
    minHeight: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    minWidth: RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
})

export default ShareComponent
