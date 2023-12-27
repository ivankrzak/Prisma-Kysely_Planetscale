import { FormEvent, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClientSafeProvider, signIn } from 'next-auth/react'
import { Schema } from 'zod'

export const useSignInForm = <T extends FieldValues, S extends Schema>(
  provider: ClientSafeProvider,
  schema?: S,
) => {
  const form = useForm<T>(
    schema
      ? {
          resolver: zodResolver(schema),
        }
      : {},
  )
  const [isLoading, setIsLoading] = useState(false)

  return {
    ...form,
    isLoading,
    onSignInSubmit: (event: FormEvent<HTMLFormElement>) => {
      void form.handleSubmit(async (formData) => {
        setIsLoading(true)
        try {
          const response = await signIn(provider.id, {
            ...formData,
          })
          if (response?.error) {
            console.log({ title: response?.error, variant: 'destructive' })
          }
        } finally {
          setIsLoading(false)
        }
      })(event)
    },
  }
}
