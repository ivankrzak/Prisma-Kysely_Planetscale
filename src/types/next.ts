import { ReactElement, ReactNode } from 'react'
import { NormalizedCacheObject } from '@apollo/client'
import { NextPage } from 'next'
import { Session } from 'next-auth'

export interface BaseAppProps {
  initialApolloState?: NormalizedCacheObject
  session: Session
}

export type NextPageWithLayout<P = BaseAppProps, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
