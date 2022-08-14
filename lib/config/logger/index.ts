import { logger, consoleTransport } from 'react-native-logs'
import { APP_IS_DEV } from '@utils/env'
import { logError } from '@utils/dev'
import type { defLvlType } from 'react-native-logs'

export const createLogger = <T extends string = defLvlType>() => {
  return logger.createLogger<T>({
    transport: APP_IS_DEV ? consoleTransport : ({ rawMsg }) => logError(rawMsg),
    severity: APP_IS_DEV ? 'debug' : 'error',
  })
}

export type Logger<T extends string = defLvlType> = ReturnType<
  typeof createLogger<T>
>
