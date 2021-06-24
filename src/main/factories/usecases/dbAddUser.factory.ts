import { AddUserUsecase } from '@domain/usecases'
import { DbAddUserUsecase } from '@data/usecases'

export const makeDbAddUserUsecase = (): AddUserUsecase => {
  return new DbAddUserUsecase()
}
