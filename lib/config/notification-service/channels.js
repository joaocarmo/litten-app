/**
 * @format
 * @flow
 */

import {
  CHANNELS_GENERAL_MESSAGES_ID,
  CHANNELS_PRIVATE_MESSAGES_ID,
} from 'utils/constants'
import { debugLog } from 'utils/dev'

const channelCallback = (channelId) => (created: boolean) =>
  debugLog('[NOTIFICATION SERVICE]', channelId, 'created:', created)

export default [
  [
    {
      channelId: CHANNELS_GENERAL_MESSAGES_ID,
      channelName: 'General messages',
      channelDescription: 'Channel for general notifications',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    (channelCallback(CHANNELS_GENERAL_MESSAGES_ID): (created: boolean) => void),
  ],
  [
    {
      channelId: CHANNELS_PRIVATE_MESSAGES_ID,
      channelName: 'Private messages',
      channelDescription: 'Channel for private messages notifications',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    (channelCallback(CHANNELS_PRIVATE_MESSAGES_ID): (created: boolean) => void),
  ],
]
