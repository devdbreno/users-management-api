import { UserModel } from '@domain/models/user.model'

export interface LoadUsersUsecase {
  load: (usersParams?: LoadUsersUsecase.Params) => Promise<LoadUsersUsecase.Return>
}

export namespace LoadUsersUsecase {
  export type Params = {
    name?: string
    lastname?: string
  }

  export type Return = ResultSucess
  export type ResultSucess = UserModel[]
}
