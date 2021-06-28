import { LoadUsersUsecase } from '@domain/usecases'
import { DbLoadUsersUsecase } from '@data/usecases'
import { UserMongoRepository } from '@infra/db'

export const makeDbLoadUsersUsecase = (): LoadUsersUsecase => {
  const userMongoRepository = new UserMongoRepository()
  return new DbLoadUsersUsecase(userMongoRepository)
}
