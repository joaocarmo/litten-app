/* eslint-disable import/prefer-default-export */
import { Alert, Linking } from 'react-native'
import { translate } from '@utils/i18n'

export const openURL = async (url: string) => {
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
