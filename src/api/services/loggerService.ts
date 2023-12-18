import pino, { Logger } from 'pino'
import pretty from 'pino-pretty'
import { createWriteStream } from 'pino-sentry'
import { ApiEnv } from '../utils/apiEnv'

const streams = pino.multistream([
  ...(ApiEnv.SENTRY_DSN
    ? [
        {
          stream: createWriteStream({
            dsn: ApiEnv.SENTRY_DSN,
            stackAttributeKey: 'err.stack',
            // Sentry is not a log sink. We want to send only errors to Sentry.
            level: 'error',
          }),
        },
      ]
    : []),
  { stream: pretty(), level: ApiEnv.LOG_LEVEL },
])

export const logger: Logger = pino(
  {
    level: ApiEnv.LOG_LEVEL,
  },
  streams,
)
