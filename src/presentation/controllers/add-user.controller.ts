// import { AddUserUsecase } from '@domain/usecases'
import { MongodbHelper } from '@infra/db/mongodb/mongodb-helper'

import { NicknameInUseError } from '@presentation/errors'
import { Controller, HttpResponse } from '@presentation/protocols'
import { conflict, created, serverError } from '@presentation/helpers'

export class AddUserController implements Controller {
  // constructor(private readonly addUserUsecase: AddUserUsecase) {}

  public async handle(request: AddUserController.Request): Promise<HttpResponse> {
    try {
      // await this.addUserUsecase.execute({
      //   ...request
      // })
      const { name, lastname, nickname, address, biography } = request

      const userCollection = await MongodbHelper.getCollection('users')
      const existsNickname = await userCollection.findOne({ nickname }, { projection: { nickname: 1, _id: 0 } })

      if (existsNickname) {
        const nicknameInUseError = new NicknameInUseError()
        return conflict(nicknameInUseError)
      }

      const userData = await userCollection.insertOne({ name, lastname, nickname, address, biography })

      return created(MongodbHelper.map(userData.ops[0]))
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddUserController {
  export type Request = {
    name: string
    lastname: string
    nickname: string
    address: string
    biography: string
  }
}
