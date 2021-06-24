import request from 'supertest'
import { Collection } from 'mongodb'

import app from '@main/config/app'
import { MONGO_URL } from '@main/config/env'
import { MongodbHelper } from '@infra/db/mongodb/mongodb-helper'
import { AddUserController } from '@presentation/controllers'

import { genRandomValidUser } from '@test/__fixtures__/domain'

describe('User Routes', () => {
  let userCollection: Collection

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
    const randomValidUser = genRandomValidUser()

    it(`Should return 201 'Created' when creating user`, async () => {
      await request(app)
        .post('/api/user')
        .send(randomValidUser)
        .expect(201)
        .then((response) => {
          expect(response.statusCode).toEqual(201)
          expect<AddUserController.Request>({
            name: response.body.name,
            lastname: response.body.lastname,
            nickname: response.body.nickname,
            address: response.body.address,
            biography: response.body.biography
          }).toStrictEqual(randomValidUser)
        })
    })

    it(`Should return 409 'Conflict' when creating user with existing nickname`, async () => {
      await request(app)
        .post('/api/user')
        .send({ ...randomValidUser, nickname: 'torvalds' })

      await request(app)
        .post('/api/user')
        .send({ ...randomValidUser, nickname: 'torvalds' })
        .expect(409)
        .then((response) => {
          expect(response.statusCode).toStrictEqual(409)
          expect(response.body.error).toStrictEqual('Nickname is already in use')
        })
    })
  })
})
