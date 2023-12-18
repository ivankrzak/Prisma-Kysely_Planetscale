import { buildHTTPExecutor } from '@graphql-tools/executor-http'
import { ExecutionRequest, ExecutionResult } from '@graphql-tools/utils'
import yoga from 'pages/api/graphql'

const executor = buildHTTPExecutor({
  // eslint-disable-next-line
  fetch: yoga.fetch,
})

type MaybeAsyncIterable<T> = T | AsyncIterable<T>

function isAsyncIterable<T>(obj: MaybeAsyncIterable<T>): obj is AsyncIterable<T> {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    Symbol.asyncIterator in obj &&
    typeof obj?.[Symbol.asyncIterator] === 'function'
  )
}

function simplifyAsyncIterable<TReturn>(
  fn: () => Promise<MaybeAsyncIterable<ExecutionResult<TReturn>>>,
): () => Promise<ExecutionResult<TReturn>> {
  return async () => {
    const result = await fn()
    if (isAsyncIterable(result)) {
      // eslint-disable-next-line no-restricted-syntax, no-unreachable-loop
      for await (const value of result) {
        return value // Assumes a single value. You might want to adjust this behavior.
      }
    } else {
      return result
    }
    throw new Error('Expected a value, but none was provided.')
  }
}

type TBaseContext = Record<string, unknown>
type TBaseExtensions = Record<string, unknown>

export function executeGQL<
  TReturn = unknown,
  TArgs extends Record<string, unknown> = Record<string, unknown>,
  TContext extends TBaseContext = TBaseContext,
  TRoot = unknown,
  TExtensions extends TBaseExtensions = TBaseExtensions,
>(
  request: ExecutionRequest<TArgs, TContext, TRoot, TExtensions, TReturn>,
): Promise<ExecutionResult<TReturn>> {
  return simplifyAsyncIterable(() => executor(request))()
}
