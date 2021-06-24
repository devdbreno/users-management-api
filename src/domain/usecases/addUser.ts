import { BuildClientErrorReturn } from '@presentation/helpers'

export interface AddUserUsecase {
  add: (account: AddUserUsecase.Params) => Promise<AddUserUsecase.Result>
}

export type AddUserData = { id: string } & AddUserUsecase.Params

export namespace AddUserUsecase {
  export type Params = {
    name: string
    lastname: string
    nickname: string
    address: string
    biography: string
  }

  export type Result = AddUserData | BuildClientErrorReturn
}
