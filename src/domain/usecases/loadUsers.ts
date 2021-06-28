import { UserModel } from '@domain/models/user.model'

export interface LoadUsersUsecase {
  load: (name?: string, lastname?: string) => Promise<LoadUsersUsecase.Result>
}

export namespace LoadUsersUsecase {
  export type Result = ResultSucess
  export type ResultSucess = UserModel[]
}
