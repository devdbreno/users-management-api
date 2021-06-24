import faker from 'faker/locale/pt_BR'

import { AddUserUsecase } from '@domain/usecases'

export const genRandomValidUser = (): AddUserUsecase.Params => ({
  name: faker.name.findName(),
  lastname: faker.internet.email(),
  nickname: faker.internet.userName().toLowerCase(),
  address: faker.address.streetAddress(true),
  biography: faker.lorem.sentence(5)
})
