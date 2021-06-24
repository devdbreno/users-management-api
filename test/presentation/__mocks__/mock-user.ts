import { AddUserUsecase } from '@domain/usecases'

export class AddUserUsecaseSpy implements AddUserUsecase {
  result!: AddUserUsecase.Result
  params!: AddUserUsecase.Params

  async add(params: AddUserUsecase.Params): Promise<AddUserUsecase.Result> {
    this.params = params
    return this.result
  }
}
