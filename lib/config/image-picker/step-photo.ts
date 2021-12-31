import { APP_IS_DEV } from 'utils/env'
import { USER_AVATAR_SIZE_LARGE } from 'utils/constants'
import { translate } from 'utils/i18n'
export const imagePickerOptions = {
  height: USER_AVATAR_SIZE_LARGE,
  width: USER_AVATAR_SIZE_LARGE,
  cropping: true,
  writeTempFile: true,
  includeBase64: APP_IS_DEV,
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
  loadingLabelText: translate('feedback.pleaseWait') as any,
  mediaType: 'photo',
  forceJpg: true,
  enableRotationGesture: true,
  cropperChooseText: translate('cta.choose') as any,
  cropperCancelText: translate('cta.cancel') as any,
}
