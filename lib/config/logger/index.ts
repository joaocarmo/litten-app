import { logger, mapConsoleTransport } from 'react-native-logs'
import { APP_IS_DEV, APP_IS_TEST, DEBUG_LEVEL } from '@utils/env'
import { logError } from '@utils/dev'
import type { defLvlType } from 'react-native-logs'

export const createLogger = () => {
  return logger.createLogger<defLvlType>({
    enabled: !APP_IS_TEST,
    severity: APP_IS_DEV ? DEBUG_LEVEL : 'error',
    transport: APP_IS_DEV
      ? mapConsoleTransport
      : ({ rawMsg }) => logError(rawMsg),
  })
}

export type Logger = ReturnType<typeof createLogger>
