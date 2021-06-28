import request from 'supertest'
import { Collection } from 'mongodb'

import app from '@main/config/app'
import { MONGO_URL } from '@main/config/env'

import { UserModel } from '@domain/models'
import { MongodbHelper } from '@infra/db'

import { created } from '@presentation/helpers'
import { NicknameInUseError } from '@presentation/errors'

const user = {
  name: 'Deivid',
  lastname: 'Novaes',
  nickname: 'devdbreno',
  address: 'Calçada, Salvador, Bahia',
  biography: 'Um desenvolvedor aí...'
}

describe('User Routes', () => {
  let userCollection: Collection<UserModel>

  beforeAll(async () => {
    await MongodbHelper.connect(MONGO_URL)
  })

  afterAll(async () => {
    await MongodbHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = await MongodbHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  describe('POST /user', () => {
    it(`Should return 201 "Created" when creating an user`, async () => {
      await request(app)
        .post('/api/users')
        .send(user)
        .expect(201)
        .then((response) => {
          const { id, createdAt, updatedAt, ...partialBody } = response.body

          expect(created(partialBody)).toStrictEqual(created(user))
        })
    })

    it('Should return 409 "Conflict" when creating user with existing nickname', async () => {
      await request(app).post('/api/users').send(user)
      await request(app)
        .post('/api/users')
        .send(user)
        .expect(409)
        .then((response) => {
          const conflictHttpError = { error: response.body.error, statusCode: response.statusCode }
          const nickNameInUseErrorHttp = { error: new NicknameInUseError().message, statusCode: 409 }

          expect(conflictHttpError).toStrictEqual(nickNameInUseErrorHttp)
        })
    })
  })

  describe('GET /users', () => {
    it('Should return 200 "OK" and an empty users list', async () => {
      const response = await request(app).get('/api/users').expect(200)

      expect(response.body).toStrictEqual([])
    })

    it('Should return 200 "OK" and appropriate users list', async () => {
      await request(app).post('/api/users').send(user)
      await request(app)
        .get('/api/users')
        .expect(200)
        .then((response) => {
          const { id, createdAt, updatedAt, ...partialBody } = response.body[0]

          expect([partialBody]).toStrictEqual([user])
        })
    })
  })
})
