import { AddUserUsecase } from '@domain/usecases'

export interface AddUserRepository {
  add: (data: AddUserRepository.Params) => Promise<AddUserRepository.Result>
}

export namespace AddUserRepository {
  export type Params = AddUserUsecase.Params
  export type Result = AddUserUsecase.Result
}
