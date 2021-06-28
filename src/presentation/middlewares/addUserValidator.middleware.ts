import { badRequest, ok, serverError } from '@presentation/helpers'
import { HttpResponse, Middleware } from '@presentation/protocols'
import { AddUserController } from '@presentation/controllers'
import { InvalidParamError, MissingParamError } from '@presentation/errors'

export class AddUserValidatorMiddleware implements Middleware {
  public async handle(request: AddUserValidatorMiddleware.Request): Promise<HttpResponse> {
    try {
      if (!request.name) return badRequest(new MissingParamError('name'))
      else if (typeof request.name !== 'string' || request.name.length < 2)
        return badRequest(new InvalidParamError('name'))

      if (!request.lastname) return badRequest(new MissingParamError('lastname'))
      else if (typeof request.lastname !== 'string' || request.lastname.length < 2)
        return badRequest(new InvalidParamError('lastname'))

      if (!request.nickname) return badRequest(new MissingParamError('nickname'))
      else if (typeof request.nickname !== 'string' || request.nickname.length > 30 || request.nickname.length < 2)
        return badRequest(new InvalidParamError('nickname'))

      if (!request.address) return badRequest(new MissingParamError('address'))
      else if (typeof request.address !== 'string' || request.address.length > 30)
        return badRequest(new InvalidParamError('address'))

      if (!request.biography) return badRequest(new MissingParamError('biography'))
      else if (typeof request.biography !== 'string' || request.biography.length < 6)
        return badRequest(new InvalidParamError('biography'))

      return ok({ a: 'b' })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddUserValidatorMiddleware {
  export type Request = Partial<AddUserController.Request>
}
