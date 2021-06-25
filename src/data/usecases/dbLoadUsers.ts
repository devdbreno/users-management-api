import { UserModel } from '@domain/models'
import { LoadUsersUsecase } from '@domain/usecases'

import { MongodbHelper } from '@infra/db'

export class DbLoadAllUserUsecase implements LoadUsersUsecase {
  constructor() {}

  public async add(userName: string, userLastname: string): Promise<LoadUsersUsecase.Return> {
    const userCollection = await MongodbHelper.getCollection<UserModel>('users')

    console.log(userName, userLastname)

    const users = await userCollection.find({ name: userName, lastname: userLastname }).toArray()
  }
}
