import faker from 'faker/locale/pt_BR'

import { AddUser } from '@domain/usecases'

export const genRandomValidUser = (): AddUser.Params => ({
  name: faker.name.findName(),
  lastname: faker.internet.email(),
  nickname: faker.internet.userName().toLowerCase(),
  address: faker.address.streetAddress(true),
  biography: faker.lorem.sentence(5)
})
