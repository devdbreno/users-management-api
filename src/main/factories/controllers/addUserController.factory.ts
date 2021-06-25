import { Controller } from '@presentation/protocols'
import { AddUserController } from '@presentation/controllers'

import { makeDbAddUserUsecase } from '@main/factories'

export const makeAddUserController = (): Controller<AddUserController.Request> => {
  return new AddUserController(makeDbAddUserUsecase())
}
