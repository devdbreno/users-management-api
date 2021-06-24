import { UserModel } from '@domain/models/user.model'
import { BuildClientErrorReturn } from '@presentation/helpers'

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

  export type Result = UserModel | BuildClientErrorReturn
}
