/**
 * @format
 * @flow
 */

import { SCREEN_LITTEN_POST_SHARED } from 'utils/constants'

const linkingConfig = {
  prefixes: ['https://litten.app/open', 'litten://'],
  config: {
    screens: {
      [SCREEN_LITTEN_POST_SHARED]: 'litten/:littenUid',
    },
  },
}

export default linkingConfig
