/**
 * @format
 * @flow
 */

import {
  Alert,
  Platform,
  Pressable,
  Share,
  StyleSheet,
  View,
} from 'react-native'
import { Share as ShareIcon } from 'images/components/arrows'
import { buildShareURI } from 'utils/functions'
import { debugLog } from 'utils/dev'
import {
  RECOMMENDED_MINIMUM_TAPPABLE_SIZE,
  STRUCTURE_SHARE_BUTTON_SIZE,
} from 'utils/constants'
import { translate } from 'utils/i18n'
import colors from 'styles/colors'

const ShareComponent: (args: any) => React$Node = ({
  filler = false,
  litten,
}) => {
  const shareLitten = async () => {
    const uri = buildShareURI(litten)
    const message: string = translate('screens.littenPost.share', {
      name: litten.title,
      uri: Platform.OS === 'android' ? uri : '',
    })

    try {
      const result = await Share.share({
        message,
        title: translate('screens.littenPost.shareTitle'),
        url: Platform.OS === 'ios' ? uri : undefined,
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // iOS shared with activity type of result.activityType
          debugLog('SHARED WITH', result.activityType)
        } else {
          // Android shared
          debugLog('SHARED')
        }
      } else if (result.action === Share.dismissedAction) {
        // iOS only dismissed
        debugLog('DISMISSED')
      }
    } catch (err) {
      debugLog(err)
    }
  }

  const handleOnShare = () => {
    if (litten.id && litten.title) {
      shareLitten()
    } else {
      Alert.alert(translate('feedback.errorMessages.littenPostMissing'))
    }
  }

  return filler ? (
    <View style={styles.shareContainer} />
  ) : (
    <Pressable onPress={handleOnShare} style={styles.shareContainer}>
      <ShareIcon
        width={STRUCTURE_SHARE_BUTTON_SIZE}
        height={STRUCTURE_SHARE_BUTTON_SIZE}
        fill={colors.white}
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
