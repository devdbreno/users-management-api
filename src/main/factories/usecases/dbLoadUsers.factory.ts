import { LoadUsersUsecase } from '@domain/usecases'
import { DbLoadUsersUsecase } from '@data/usecases'

export const makeDbLoadUsersUsecase = (): LoadUsersUsecase => {
  return new DbLoadUsersUsecase()
}
