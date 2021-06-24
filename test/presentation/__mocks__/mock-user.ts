import { AddUserUsecase } from '@domain/usecases'

export class AddUserSpy implements AddUserUsecase {
  result!: AddUserUsecase.Result
  params!: AddUserUsecase.Params

  async add(params: AddUserUsecase.Params): Promise<AddUserUsecase.Result> {
    this.params = params

    console.log(`AddUserSpy`)
    console.log(`this.params`, this.params)

    return this.result
  }
}
