import { makeDbAddUserUsecase } from '@main/factories'

import { Controller } from '@presentation/protocols'
import { AddUserController } from '@presentation/controllers'

export const makeAddUserController = (): Controller<AddUserController.Request> => {
  return new AddUserController(makeDbAddUserUsecase())
}
