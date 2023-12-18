import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Route } from 'constants/common/routes'

export const useLoginCallback = () => {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      const callbackUrl = decodeURIComponent((router.query?.callbackUrl as string) || Route.Base)
      void router.push(callbackUrl)
    }
  }, [status, router])
}
