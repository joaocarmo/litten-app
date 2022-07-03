import {
  CHANNELS_GENERAL_MESSAGES_ID,
  CHANNELS_PRIVATE_MESSAGES_ID,
} from '@utils/constants'
import { debugLog } from '@utils/dev'

type ChannelCallback = (created: boolean) => void

type Channel = {
  channelId: string
  channelName: string
  channelDescription: string
  soundName: string
  importance: number
  vibrate: boolean
}

const channelCallback =
  (channelId: string): ChannelCallback =>
  (created: boolean) =>
    debugLog('[NOTIFICATION SERVICE]', channelId, 'created:', created)

const channels: [Channel, ChannelCallback][] = [
  [
    {
      channelId: CHANNELS_GENERAL_MESSAGES_ID,
      channelName: 'General messages',
      channelDescription: 'Channel for general notifications',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    channelCallback(CHANNELS_GENERAL_MESSAGES_ID),
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
    channelCallback(CHANNELS_PRIVATE_MESSAGES_ID),
  ],
]

export default channels
