import { AddUserUsecase } from '@domain/usecases'

import { NicknameInUseError } from '@presentation/errors'
import { Controller, HttpResponse } from '@presentation/protocols'
import { conflict, created, serverError } from '@presentation/helpers'

export class AddUserController implements Controller {
  constructor(private readonly addUserUsecase: AddUserUsecase) {}

  public async handle(request: AddUserController.Request): Promise<HttpResponse> {
    try {
      const userOrError = await this.addUserUsecase.add({
        name: request.name,
        lastname: request.lastname,
        nickname: request.nickname,
        address: request.address,
        biography: request.biography
      })

      if (userOrError instanceof NicknameInUseError) return conflict(userOrError)

      return created(userOrError)
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
