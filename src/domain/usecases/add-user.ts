export interface AddUser {
  add: (account: AddUser.Params) => Promise<AddUser.Result>
}

export namespace AddUser {
  export type Params = {
    name: string
    lastname: string
    nickname: string
    address: string
    biography: string
  }

  export type Result = boolean
}
