import { AddUserUsecase } from '@domain/usecases'
import { AddUserRepository } from '@data/protocols'

export class DbAddUserUsecase implements AddUserUsecase {
  constructor(private readonly addUserRespository: AddUserRepository) {}

  public async add(data: AddUserUsecase.Params): Promise<AddUserUsecase.Result> {
    return this.addUserRespository.add(data)
  }
}
