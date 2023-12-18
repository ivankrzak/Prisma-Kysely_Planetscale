import { z } from 'zod'

const EnvSchema = z.object({
  NEXT_PUBLIC_SENTRY_DSN: z.string().refine((val) => val || process.env.NODE_ENV === 'development'),
})

const NextPublicEnvVars = {
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
}

const parsingResult = EnvSchema.safeParse(process.env)

let envRes = NextPublicEnvVars as unknown as z.infer<typeof EnvSchema>

if (parsingResult.success) {
  envRes = parsingResult.data
} else if (process.env.WITH_ENV_VALIDATION === 'true') {
  throw new Error(`Invalid WEB env variables: ${JSON.stringify(parsingResult.error.format())}`)
}

export const ClientEnv = envRes
