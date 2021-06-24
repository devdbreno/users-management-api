import { AddUserUsecase } from '@domain/usecases'
// import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols'
import { MongodbHelper } from '@infra/db'

import { conflict } from '@presentation/helpers'
import { buildClientError } from '@presentation/helpers'
import { NicknameInUseError } from '@presentation/errors'

export class DbAddUserUsecase implements AddUserUsecase {
  constructor() {} // private readonly checkUserByNicknameRepository: CheckAccountByEmailRepository // private readonly addAccountRepository: AddAccountRepository,

  async add(userData: AddUserUsecase.Params): Promise<AddUserUsecase.Result> {
    const userCollection = await MongodbHelper.getCollection('users')
    const existsNickname = await userCollection.findOne(
      {
        nickname: userData.nickname
      },
      {
        projection: { nickname: 1 }
      }
    )

    if (existsNickname) return buildClientError(NicknameInUseError, conflict)

    const user = MongodbHelper.map((await userCollection.insertOne(userData)).ops[0]) as AddUserUsecase.Result

    return user
  }
}
