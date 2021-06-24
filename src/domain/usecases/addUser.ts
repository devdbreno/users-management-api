export interface AddUserUsecase {
  add: (account: AddUserUsecase.Params) => Promise<AddUserUsecase.Result>
}

export namespace AddUserUsecase {
  export type Params = {
    name: string
    lastname: string
    nickname: string
    address: string
    biography: string
  }

  export type Result = { id: string } & AddUserUsecase.Params
}
