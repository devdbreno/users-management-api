// import { AddUserUsecase } from '@domain/usecases'
import { mongodbHelper } from '@main/server'
import { created, serverError } from '@presentation/helpers'
import { Controller, HttpResponse } from '@presentation/protocols'

import MongodbHelper from '@infra/db/mongodb/mongodb-helper'

export class AddUserController implements Controller {
  // constructor(private readonly addUserUsecase: AddUserUsecase) {}

  public async handle(request: AddUserController.Request): Promise<HttpResponse> {
    try {
      // await this.addUserUsecase.execute({
      //   ...request
      // })
      const userCollection = await mongodbHelper.getCollection('users')

      const userData = await userCollection.insertOne(request)

      return created(userData.ops[0])
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}

export namespace AddUserController {
  export type Request = {
    name: string
    lastname: string
    nickname: string
  }
}
