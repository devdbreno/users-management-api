import { UserModel } from '@domain/models'
import { AddUserUsecase } from '@domain/usecases'

import { MongodbHelper } from '@infra/db'
import { NicknameInUseError } from '@presentation/errors'

export class DbAddUserUsecase implements AddUserUsecase {
  constructor() {}

  async add(userData: AddUserUsecase.Params): Promise<AddUserUsecase.Return> {
    const userCollection = await MongodbHelper.getCollection<Omit<UserModel, 'id'>>('users')

    const existsNickname = await userCollection.findOne({ nickname: userData.nickname }, { projection: { _id: 1 } })
    if (existsNickname) return new NicknameInUseError()

    const { ops: result } = await userCollection.insertOne({
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return MongodbHelper.map<UserModel>(result[0])
  }
}
