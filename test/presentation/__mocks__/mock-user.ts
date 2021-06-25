import { AddUserUsecase } from '@domain/usecases'

export class AddUserUsecaseSpy implements AddUserUsecase {
  return!: AddUserUsecase.Return
  params!: AddUserUsecase.Params

  async add(params: AddUserUsecase.Params): Promise<AddUserUsecase.Return> {
    this.params = params
    return this.return
  }
}
