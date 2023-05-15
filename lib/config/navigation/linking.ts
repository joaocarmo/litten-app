import { Routes } from '@utils/constants'

const linkingConfig = {
  prefixes: ['https://litten.app/open', 'litten://'],
  config: {
    screens: {
      [Routes.SCREEN_LITTEN_POST_SHARED]: 'litten/:littenUid',
      [Routes.SCREEN_PROFILE_VERIFICATION]: 'verification',
    },
  },
}

export default linkingConfig
