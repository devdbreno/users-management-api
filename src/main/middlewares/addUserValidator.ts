import { adaptMiddleware } from '@main/adapters'
import { makeAddUserValidatorMiddleware } from '@main/factories'

export const addUserValidator = adaptMiddleware(makeAddUserValidatorMiddleware())
