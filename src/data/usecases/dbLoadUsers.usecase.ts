import { LoadUsersUsecase } from '@domain/usecases'
import { LoadUsersRepository } from '@data/protocols'

export class DbLoadUsersUsecase implements LoadUsersUsecase {
  constructor(private readonly loadUsersRepository: LoadUsersRepository) {}

  public async load(name?: string, lastname?: string): Promise<LoadUsersUsecase.Result> {
    return this.loadUsersRepository.load(name, lastname)
  }
}
