import { AddUserUsecase } from '@domain/usecases'

import { created, serverError } from '@presentation/helpers'
import { Controller, HttpResponse } from '@presentation/protocols'

export class AddUserController implements Controller {
  constructor(private readonly addUserUsecase: AddUserUsecase) {}

  public async handle(request: AddUserController.Request): Promise<HttpResponse> {
    try {
      const user = await this.addUserUsecase.add(request)

      return created(user)
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
