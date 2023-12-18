import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import { useSession } from 'next-auth/react'

export const useSetSentryUser = () => {
  const { data } = useSession()

  useEffect(() => {
    Sentry.setUser({
      id: data?.user?.id,
      email: data?.user?.user.email ?? undefined,
    })
  }, [data])
}
