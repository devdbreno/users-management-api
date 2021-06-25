import request from 'supertest'
import { Collection } from 'mongodb'

import app from '@main/config/app'
import { MONGO_URL } from '@main/config/env'

import { MongodbHelper } from '@infra/db/mongodb/mongodb-helper'

import { created } from '@presentation/helpers'
import { AddUserController } from '@presentation/controllers'
import { NicknameInUseError } from '@presentation/errors'

import { randomValidUser } from '@test/__fixtures__'

describe('User Routes', () => {
  let userCollection: Collection
  let validUser: AddUserController.Request

  beforeAll(async () => {
    await MongodbHelper.connect(MONGO_URL)
  })

  afterAll(async () => {
    await MongodbHelper.disconnect()
  })

  beforeEach(async () => {
    validUser = randomValidUser()

    userCollection = await MongodbHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  describe('POST /user', () => {
    it(`Should return 201 'Created' when creating user`, async () => {
      await request(app)
        .post('/api/user')
        .send(validUser)
        .expect(201)
        .then((response) => {
          const { id, createdAt, updatedAt, ...responseBody } = response.body
          expect(created(responseBody)).toStrictEqual(created(validUser))
        })
    })

    it(`Should return 409 'Conflict' when creating user with existing nickname`, async () => {
      validUser.nickname = 'torvalds'

      await request(app).post('/api/user').send(validUser)
      const response = await request(app).post('/api/user').send(validUser).expect(409)

      const conflictHttpNicknameInUseError = {
        error: new NicknameInUseError().message,
        statusCode: 409
      }

      const conflictResponseError = {
        error: response.body.error,
        statusCode: response.statusCode
      }

      expect(conflictResponseError).toStrictEqual(conflictHttpNicknameInUseError)
    })
  })
})
