import { Kysely, MysqlDialect } from 'kysely'
import { PlanetScaleDialect } from 'kysely-planetscale'
import { createPool } from 'mysql2'
import { DB } from '../prisma/generated/types'
export * from '../prisma/generated/types'

export const kyselyClient = new Kysely<DB>({
  dialect:
    process.env.NODE_ENV === 'development'
      ? new MysqlDialect({
          pool: createPool({
            uri: process.env.DATABASE_CONNECTION_URL,
            connectionLimit: 10,
          }),
        })
      : new PlanetScaleDialect({
          url: process.env.DATABASE_CONNECTION_URL,
        }),
})
