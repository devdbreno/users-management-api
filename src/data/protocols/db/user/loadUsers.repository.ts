import { LoadUsersUsecase } from '@domain/usecases'

export interface LoadUsersRepository {
  load: (name?: string, lastname?: string) => Promise<LoadUsersRepository.Result>
}

export namespace LoadUsersRepository {
  export type Result = LoadUsersUsecase.Result
}
