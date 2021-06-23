import { Controller } from '@presentation/protocols'
import { AddUserController } from '@presentation/controllers'

export const makeAddUserController = (): Controller => {
  return new AddUserController()
}
