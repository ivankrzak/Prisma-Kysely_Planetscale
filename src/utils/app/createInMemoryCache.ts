import { InMemoryCache } from '@apollo/client'

export const createInMemoryCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // add field policies here
        },
      },
    },
  })
