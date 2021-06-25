import { AddUserUsecase } from '@domain/usecases'

import { AddUserController } from '@presentation/controllers'
import { ServerError, NicknameInUseError } from '@presentation/errors'
import { created, serverError, conflict, buildClientError } from '@presentation/helpers'

import { AddUserUsecaseSpy } from '@test/presentation/__mocks__'
import { throwError, randomValidUserModel, randomValidUser } from '@test/__fixtures__'

type SutTypes = {
  addUserUsecaseSpy: AddUserUsecaseSpy
  addUserControllerSut: AddUserController
}

const makeSut = (): SutTypes => {
  const addUserUsecaseSpy = new AddUserUsecaseSpy()
  const addUserControllerSut = new AddUserController(addUserUsecaseSpy)
  return { addUserUsecaseSpy, addUserControllerSut }
}

describe('AddUserController', () => {
  let validUser: AddUserController.Request
  let validUserModel: AddUserUsecase.ResultSucess

  beforeEach(() => {
    validUser = randomValidUser()
    validUserModel = randomValidUserModel(validUser)
  })

  it('Should call AddUserController.handle with valid user', async () => {
    const { addUserUsecaseSpy, addUserControllerSut } = makeSut()

    await addUserControllerSut.handle(validUser)
    expect(addUserUsecaseSpy.params).toStrictEqual(validUser)
  })

  it(`Should return 201 'Created' if valid user data is provided`, async () => {
    const { addUserUsecaseSpy, addUserControllerSut } = makeSut()
    jest.spyOn(addUserUsecaseSpy, 'add').mockResolvedValueOnce(validUserModel)

    const httpResponse = await addUserControllerSut.handle(validUser)
    expect(httpResponse).toStrictEqual(created(validUserModel))
  })

  it(`Should return 409 'Conflict' if AddUserUsecase returns a conflict error`, async () => {
    const { addUserUsecaseSpy, addUserControllerSut } = makeSut()

    addUserUsecaseSpy.return = buildClientError(NicknameInUseError, conflict)

    const httpResponse = await addUserControllerSut.handle(validUser)
    expect(httpResponse).toStrictEqual(conflict(new NicknameInUseError()))
  })

  it('Should return 500 if AddUserUsecase throws', async () => {
    const { addUserUsecaseSpy, addUserControllerSut } = makeSut()
    jest.spyOn(addUserUsecaseSpy, 'add').mockImplementationOnce(throwError)

    const httpResponse = await addUserControllerSut.handle(validUser)
    expect(httpResponse).toStrictEqual(serverError(new ServerError()))
  })
})
