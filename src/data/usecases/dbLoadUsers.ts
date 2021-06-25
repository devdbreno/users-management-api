import { MongodbHelper } from '@infra/db'
import { LoadUsersUsecase } from '@domain/usecases'

export class DbLoadAllUserUsecase implements LoadUsersUsecase {
  constructor() {}

  public async add(userName: string, userLastname: string): Promise<LoadUsersUsecase.Return> {
    const userCollection = await MongodbHelper.getCollection('users')

    console.log(userName, userLastname)

    const users = await userCollection.find({ name: userName, lastname: userLastname })
  }
}
