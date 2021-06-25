import { ObjectID } from 'mongodb'
import faker from 'faker/locale/pt_BR'

import { AddUserUsecase } from '@domain/usecases'

export const randomValidUser = (): AddUserUsecase.Params => ({
  name: faker.name.findName(),
  lastname: faker.name.lastName(),
  nickname: faker.internet.userName().toLowerCase(),
  address: faker.address.streetAddress(true),
  biography: faker.lorem.sentence(5)
})

export const randomValidUserModel = (user: AddUserUsecase.Params): AddUserUsecase.ResultSucess => ({
  id: new ObjectID().toHexString(),
  ...user,
  createdAt: new Date(),
  updatedAt: new Date()
})
