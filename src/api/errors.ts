/* eslint-disable max-classes-per-file */
import { GraphQLError, GraphQLErrorExtensions } from 'graphql'

export enum ErrorKey {
  InternalError = 'InternalError',
  Forbidden = 'Forbidden',
  NotFound = 'NotFound',
  InvalidInput = 'InvalidInput',
  Unauthorized = 'Unauthorized',
}

const ErrorMessages = {
  [ErrorKey.InternalError]: 'Something went wrong.',
  [ErrorKey.Forbidden]: 'You do not have permission to perform this action.',
  [ErrorKey.NotFound]: `Can't find the item. Verify and try again.`,
  [ErrorKey.InvalidInput]: 'The input you have provided is invalid.',
  [ErrorKey.Unauthorized]: 'You need to be logged in to perform this action.',
}

export class ValidationError extends GraphQLError {
  extensions: GraphQLErrorExtensions
  constructor(
    message: string = ErrorMessages[ErrorKey.InvalidInput],
    errorKey: ErrorKey = ErrorKey.InvalidInput,
  ) {
    super(message)
    this.extensions = {
      code: errorKey,
      type: 'ValidationError',
    }
  }
}

export class UnauthorizedError extends GraphQLError {
  extensions: GraphQLErrorExtensions
  constructor(
    message: string = ErrorMessages[ErrorKey.Unauthorized],
    errorKey: ErrorKey = ErrorKey.Unauthorized,
  ) {
    super(message)
    this.extensions = {
      code: errorKey,
      type: 'UnauthorizedError',
    }
  }
}

export class ForbiddenError extends GraphQLError {
  extensions: GraphQLErrorExtensions
  constructor(
    message: string = ErrorMessages[ErrorKey.Forbidden],
    errorKey: ErrorKey = ErrorKey.Forbidden,
  ) {
    super(message)
    this.extensions = {
      code: errorKey,
      type: 'ForbiddenError',
    }
  }
}

export class NotFoundError extends GraphQLError {
  extensions: GraphQLErrorExtensions
  constructor(
    message: string = ErrorMessages[ErrorKey.NotFound],
    errorKey: ErrorKey = ErrorKey.NotFound,
  ) {
    super(message)
    this.extensions = {
      code: errorKey,
      type: 'NotFoundError',
    }
  }
}

export class InternalError extends GraphQLError {
  extensions: GraphQLErrorExtensions
  constructor(
    message: string = ErrorMessages[ErrorKey.InternalError],
    errorKey: ErrorKey = ErrorKey.InternalError,
  ) {
    super(message)
    this.extensions = {
      code: errorKey,
      type: 'InternalError',
    }
  }
}
