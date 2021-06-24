import { AddUserController } from '@presentation/controllers'
import { created, serverError, badRequest, conflict } from '@presentation/helpers'
import { MissingParamError, ServerError, NicknameInUseError } from '@presentation/errors'

// import { throwError } from '@test/domain/mocks'
import { AddUserSpy } from '@test/presentation/__mocks__'
import { genRandomValidUser } from '@test/__fixtures__/domain'

type SutTypes = {
  addUserSpy: AddUserSpy
  controllerSut: AddUserController
}

const makeSut = (): SutTypes => {
  const addUserSpy = new AddUserSpy()
  const controllerSut = new AddUserController()

  return { addUserSpy, controllerSut }
}

describe('AddUser Controller', () => {
  const randomValidUser = genRandomValidUser()

  it('Should call AddUser with correct values', async () => {
    const { addUserSpy, controllerSut } = makeSut()

    await controllerSut.handle(randomValidUser)

    expect(addUserSpy.params).toStrictEqual({
      name: randomValidUser.name,
      lastname: randomValidUser.lastname
    })
  })
})
