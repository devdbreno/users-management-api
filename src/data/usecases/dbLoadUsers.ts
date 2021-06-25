// import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols'
import { MongodbHelper } from '@infra/db'
import { LoadUsersUsecase } from '@domain/usecases'

export class DbLoadAllUserUsecase implements LoadUsersUsecase {
  constructor() {} // private readonly checkUserByNicknameRepository: CheckAccountByEmailRepository // private readonly addAccountRepository: AddAccountRepository,

  public async add(userName: string, userLastname: string): Promise<LoadUsersUsecase.Result> {
    const userCollection = await MongodbHelper.getCollection('users')

    console.log(userName, userLastname)

    const users = await userCollection.find({ name: userName, lastname: userLastname })
  }
}
