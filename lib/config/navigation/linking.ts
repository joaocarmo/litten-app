import {
  SCREEN_LITTEN_POST_SHARED,
  SCREEN_PROFILE_VERIFICATION,
} from 'utils/constants'
const linkingConfig = {
  prefixes: ['https://litten.app/open', 'litten://'],
  config: {
    screens: {
      [SCREEN_LITTEN_POST_SHARED]: 'litten/:littenUid',
      [SCREEN_PROFILE_VERIFICATION]: 'verification',
    } as {
      'litten/post/shared': string
      'profile/verification': string
    },
  },
}
export default linkingConfig
