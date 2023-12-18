import { z } from 'zod'

const EnvSchema = z.object({
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
  SENTRY_DSN: z.string().refine((val) => val || process.env.NODE_ENV === 'development'),
  SENTRY_DRY_RUN: z.boolean().optional(),
  NEXTAUTH_URL: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
  EMAIL_FROM: z.string(),
  AUTH0_CLIENT_ID: z.string(),
  AUTH0_CLIENT_SECRET: z.string(),
  AUTH0_ISSUER: z.string(),
  WEB_URL: z.string().url(),
  NODE_ENV: z.string(),
})

const parsingResult = EnvSchema.safeParse(process.env)

let envRes = process.env as unknown as z.infer<typeof EnvSchema>

if (parsingResult.success) {
  envRes = parsingResult.data
} else if (process.env.WITH_ENV_VALIDATION === 'true') {
  throw new Error(`Invalid API env variables: ${JSON.stringify(parsingResult.error.format())}`)
}

export const ApiEnv = envRes
