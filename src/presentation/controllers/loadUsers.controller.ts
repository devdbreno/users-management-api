import { LoadUsersUsecase } from '@domain/usecases'

import { ok, serverError } from '@presentation/helpers'
import { Controller, HttpResponse } from '@presentation/protocols'

export class LoadUsersController implements Controller {
  constructor(private readonly loadUsersUsecase: LoadUsersUsecase) {}

  public async handle(request: LoadUsersController.Request): Promise<HttpResponse> {
    try {
      const usersOrError = await this.loadUsersUsecase.load(request.name, request.lastname)

      return ok(usersOrError)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}

export namespace LoadUsersController {
  export type Request = {
    name: string
    lastname: string
  }
}
