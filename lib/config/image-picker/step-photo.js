/**
 * @format
 * @flow
 */

import { USER_AVATAR_SIZE_LARGE } from 'utils/constants'
import { translate } from 'utils/i18n'

export const imagePickerOptions = {
  height: USER_AVATAR_SIZE_LARGE,
  width: USER_AVATAR_SIZE_LARGE,
  cropping: true,
  writeTempFile: true,
  includeBase64: false,
  avoidEmptySpaceAroundImage: true,
  cropperCircleOverlay: true,
  smartAlbums: [
    'PhotoStream',
    'Generic',
    'Favorites',
    'RecentlyAdded',
    'UserLibrary',
    'SelfPortraits',
    'LivePhotos',
  ],
  useFrontCamera: true,
  compressImageQuality: 0.8,
  loadingLabelText: translate('feedback.pleaseWait'),
  mediaType: 'photo',
  forceJpg: true,
  enableRotationGesture: true,
  cropperChooseText: translate('cta.choose'),
  cropperCancelText: translate('cta.cancel'),
}
