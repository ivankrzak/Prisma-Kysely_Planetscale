import { Account, Role } from '@prisma/client'
import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      sessionToken: string
      userId: string
      expires: Date
      user: User
    }
  }

  interface User {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    role: Role
    accounts: Account[]
    sessions: Session[]
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: Role
    exp: number
  }
}
