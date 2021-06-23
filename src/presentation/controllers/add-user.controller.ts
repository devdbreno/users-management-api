// import { AddUserUsecase } from '@domain/usecases'
import { Controller, HttpResponse } from '@presentation/protocols'
// import { badRequest, serverError, noContent } from '@presentation/helpers'

export class AddUserController implements Controller {
  // constructor(private readonly addUserUsecase: AddUserUsecase) {}

  public async handle(request: AddUserController.Request): Promise<HttpResponse> {
    try {
      console.log(request)
      // await this.addUserUsecase.execute({
      //   ...request,
      // })

      return { body: null, statusCode: 201 }
    } catch (error) {
      return { body: null, statusCode: 500 }
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
