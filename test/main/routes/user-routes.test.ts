import { deepStrictEqual } from 'assert'

import request from 'supertest'
import { Collection } from 'mongodb'

import app from '@main/config/app'
import { MONGO_URL } from '@main/config/env'

import { genRandomValidUser } from '@test/__fixtures__/domain'
import { MongodbHelper } from '@infra/db/mongodb/mongodb-helper'

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
      await request(app).post('/api/user').send(randomValidUser).expect(201)
    })

    it(`Should return 409 'Conflict' when creating user with existing nickname`, async () => {
      await request(app)
        .post('/api/user')
        .send({ ...randomValidUser, nickname: 'torvalds' })

      await request(app)
        .post('/api/user')
        .send({ ...randomValidUser, nickname: 'torvalds' })
        .expect(409)
        .expect(({ body: { error } }) => deepStrictEqual(error, 'Nickname is already in use'))
    })
  })
})
