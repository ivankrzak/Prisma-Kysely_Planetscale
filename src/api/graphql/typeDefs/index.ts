import { mergeTypeDefs } from '@graphql-tools/merge'
import auth from './auth.graphql'
import hello from './hello.graphql'
import user from './user.graphql'

export default mergeTypeDefs([hello, auth, user])
