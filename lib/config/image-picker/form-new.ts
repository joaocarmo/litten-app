import { APP_IS_DEV } from 'utils/env'
import { POST_PHOTO_SIZE_HEIGHT, POST_PHOTO_SIZE_WIDTH } from 'utils/constants'
import { translate } from 'utils/i18n'
export const imagePickerOptions = {
  height: POST_PHOTO_SIZE_HEIGHT,
  width: POST_PHOTO_SIZE_WIDTH,
  cropping: true,
  writeTempFile: true,
  includeBase64: APP_IS_DEV,
  avoidEmptySpaceAroundImage: true,
  cropperCircleOverlay: false,
  smartAlbums: [
    'PhotoStream',
    'Generic',
    'Favorites',
    'RecentlyAdded',
    'UserLibrary',
    'SelfPortraits',
    'LivePhotos',
  ],
  useFrontCamera: false,
  compressImageQuality: 0.8,
  loadingLabelText: translate('feedback.pleaseWait') as any,
  mediaType: 'photo',
  forceJpg: true,
  enableRotationGesture: true,
  cropperChooseText: translate('cta.choose') as any,
  cropperCancelText: translate('cta.cancel') as any,
}
