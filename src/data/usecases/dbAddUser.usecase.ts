import { AddUserUsecase } from '@domain/usecases'
// import { AddAccountRepository, CheckAccountByEmailRepository } from '@/data/protocols'

import { MongodbHelper } from '@infra/db'

export class DbAddUserUsecase implements AddUserUsecase {
  constructor() {} // private readonly checkUserByNicknameRepository: CheckAccountByEmailRepository // private readonly addAccountRepository: AddAccountRepository,

  async add(userData: AddUserUsecase.Params): Promise<AddUserUsecase.Result> {
    console.log(userData)

    // const userCollection = await MongodbHelper.getCollection('users')
    // const existsNickname = await userCollection.findOne({ nickname }, { projection: { nickname: 1, _id: 0 } })

    // if (existsNickname) {
    //   const nicknameInUseError = new NicknameInUseError()
    //   return conflict(nicknameInUseError)
    // }

    // const user = await userCollection.insertOne({ name, lastname, nickname, address, biography })

    // const exists = await this.checkUserByNicknameRepository.checkByEmail(userData.nickname)
    // let isValid = false

    // if (!exists) {
    //   isValid = await this.addAccountRepository.add({ ...userData, password: hashedPassword })
    // }

    return { id: '0dgfbb653ffg', ...userData }
  }
}
