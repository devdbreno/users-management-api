import { makeDbLoadUsersUsecase } from '@main/factories'

import { Controller } from '@presentation/protocols'
import { LoadUsersController } from '@presentation/controllers'

export const makeLoadUsersController = (): Controller<LoadUsersController.Request> => {
  return new LoadUsersController(makeDbLoadUsersUsecase())
}
