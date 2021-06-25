import { UserModel } from '@domain/models'
import { LoadUsersUsecase } from '@domain/usecases'

import { MongodbHelper } from '@infra/db'

export class DbLoadUsersUsecase implements LoadUsersUsecase {
  constructor() {}

  public async load(usersParams?: LoadUsersUsecase.Params): Promise<LoadUsersUsecase.Return> {
    const userCollection = await MongodbHelper.getCollection<UserModel>('users')

    const result = await userCollection
      .find({
        name: usersParams?.name,
        lastname: usersParams?.lastname
      })
      .toArray()

    return result
  }
}
