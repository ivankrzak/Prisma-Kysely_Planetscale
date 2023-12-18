import { BuiltInProviderType } from 'next-auth/providers'
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import { LoginFormValues } from 'types/auth'
import { z } from 'zod'
import { useSignInForm } from './useSignInForm'

export const EMAIL_PROVIDER_ID = 'email'

export const EmailLoginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
})

export const useEmailSignInForm = (
  providers:
    | ClientSafeProvider[]
    | Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>,
) => {
  const emailProvider = Object.values(providers)
    .filter(({ id }) => id === EMAIL_PROVIDER_ID)
    .pop()

  if (!emailProvider) {
    throw new Error('Email auth provider is missing')
  }

  return useSignInForm<LoginFormValues, typeof EmailLoginSchema>(emailProvider, EmailLoginSchema)
}
