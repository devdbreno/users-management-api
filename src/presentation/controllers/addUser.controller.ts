import { AddUserUsecase } from '@domain/usecases'

import { created, serverError } from '@presentation/helpers'
import { Controller, HttpResponse } from '@presentation/protocols'

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

      const hasClientError = Reflect.has(userOrError, 'clientError')

      if (hasClientError) {
        const { applyError, buildError } = Reflect.get(userOrError, 'clientError')
        return applyError(buildError())
      }

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
