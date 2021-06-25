import { UserModel } from '@domain/models/user.model'

export interface LoadUsersUsecase {
  add: (userName: string, userLastname: string) => Promise<LoadUsersUsecase.Result>
}

export namespace LoadUsersUsecase {
  export type Result = UserModel[]
}
