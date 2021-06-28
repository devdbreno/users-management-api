import { AddUserUsecase } from '@domain/usecases'

import { AddUserController } from '@presentation/controllers'
import { created, serverError, conflict } from '@presentation/helpers'
import { ServerError, NicknameInUseError } from '@presentation/errors'

import { AddUserUsecaseSpy } from '@test/presentation/__mocks__'
import { throwError, randomValidUserModel, randomValidUser } from '@test/__fixtures__'

type SutTypes = {
  usecaseSpy: AddUserUsecaseSpy
  controller: AddUserController
}

const makeSut = (): SutTypes => {
  const usecaseSpy = new AddUserUsecaseSpy()
  const controller = new AddUserController(usecaseSpy)

  return { usecaseSpy, controller }
}

describe('AddUserController', () => {
  let validUser: AddUserController.Request
  let validUserModel: AddUserUsecase.ResultSucess

  beforeEach(() => {
    validUser = randomValidUser()
    validUserModel = randomValidUserModel(validUser)
  })

  it('Should call AddUserController.handle with valid user', async () => {
    const { usecaseSpy, controller } = makeSut()

    await controller.handle(validUser)

    expect(usecaseSpy.params).toStrictEqual(validUser)
  })

  it(`Should return 201 'Created' if valid user data is provided`, async () => {
    const { usecaseSpy, controller } = makeSut()

    jest.spyOn(usecaseSpy, 'add').mockResolvedValueOnce(validUserModel)

    const httpResponse = await controller.handle(validUser)
    expect(httpResponse).toStrictEqual(created(validUserModel))
  })

  it(`Should return 409 'Conflict' if AddUserUsecase returns a conflict error`, async () => {
    const { usecaseSpy, controller } = makeSut()

    usecaseSpy.return = new NicknameInUseError()

    const httpResponse = await controller.handle(validUser)
    expect(httpResponse).toStrictEqual(conflict(new NicknameInUseError()))
  })

  it('Should return 500 if AddUserUsecase throws', async () => {
    const { usecaseSpy, controller } = makeSut()

    jest.spyOn(usecaseSpy, 'add').mockImplementationOnce(throwError)

    const httpResponse = await controller.handle(validUser)
    expect(httpResponse).toStrictEqual(serverError(new ServerError()))
  })
})
