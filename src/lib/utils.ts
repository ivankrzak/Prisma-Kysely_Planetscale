export const assertUnreachable = (x: never): never => {
  throw new Error(`Didn't expect to ${JSON.stringify(x)} get here`)
}
