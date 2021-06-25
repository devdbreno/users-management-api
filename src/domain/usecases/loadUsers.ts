import { UserModel } from '@domain/models/user.model'

export interface LoadUsersUsecase {
  add: (userName: string, userLastname: string) => Promise<LoadUsersUsecase.Return>
}

export namespace LoadUsersUsecase {
  export type Return = ResultSucess
  export type ResultSucess = UserModel[]
}
