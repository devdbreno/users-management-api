import { UserModel } from '@domain/models/user.model'
import { NicknameInUseError } from '@presentation/errors'

export interface AddUserUsecase {
  add: (user: AddUserUsecase.Params) => Promise<AddUserUsecase.Result>
}

export namespace AddUserUsecase {
  export type Params = {
    name: string
    lastname: string
    nickname: string
    address: string
    biography: string
  }

  export type Result = ResultSucess | ResultError
  export type ResultError = NicknameInUseError
  export type ResultSucess = UserModel
}
