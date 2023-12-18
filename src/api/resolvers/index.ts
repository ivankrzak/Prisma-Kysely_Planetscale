import { mergeResolvers } from '@graphql-tools/merge'
import { HelloResolver } from './helloResolver'

export default mergeResolvers([HelloResolver])
