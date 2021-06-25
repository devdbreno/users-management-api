import { AddUserUsecase } from '@domain/usecases'
// import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols'
import { MongodbHelper } from '@infra/db'

import { buildClientError } from '@presentation/helpers'
import { NicknameInUseError } from '@presentation/errors'
import { BuildClientErrorReturn, conflict } from '@presentation/helpers'

export class DbAddUserUsecase implements AddUserUsecase {
  constructor() {} // private readonly checkUserByNicknameRepository: CheckAccountByEmailRepository // private readonly addAccountRepository: AddAccountRepository,

  async add(userData: AddUserUsecase.Params): Promise<AddUserUsecase.Result | BuildClientErrorReturn> {
    const userCollection = await MongodbHelper.getCollection('users')
    const existsNickname = await userCollection.findOne({ nickname: userData.nickname }, { projection: { _id: 1 } })

    if (existsNickname) return buildClientError(NicknameInUseError, conflict)

    const user = (
      await userCollection.insertOne({
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    ).ops[0]

    return MongodbHelper.map(user) as AddUserUsecase.Result
  }
}
