import { AddUserUsecase } from '@domain/usecases'
import { DbAddUserUsecase } from '@data/usecases'
import { UserMongoRepository } from '@infra/db'

export const makeDbAddUserUsecase = (): AddUserUsecase => {
  const userMongoRepository = new UserMongoRepository()
  return new DbAddUserUsecase(userMongoRepository)
}
