import { Middleware } from '@presentation/protocols'
import { AddUserValidatorMiddleware } from '@presentation/middlewares'

export const makeAddUserValidatorMiddleware = (): Middleware => {
  return new AddUserValidatorMiddleware()
}
