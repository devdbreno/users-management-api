import request from 'supertest'
import { Collection } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'

import app from '@main/config/app'
import MongodbHelper from '@infra/db/mongodb/mongodb-helper'

let userCollection: Collection

const mongodbSut = {
  mongodbHelper: new MongodbHelper(),
  mongodbMemoryServer: new MongoMemoryServer()
}

describe('User Routes', () => {
  beforeAll(async () => {
    const mongodbUri = await mongodbSut.mongodbMemoryServer.getUri()
    await mongodbSut.mongodbHelper.connect(mongodbUri)
  })

  afterAll(async () => {
    await mongodbSut.mongodbHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = await mongodbSut.mongodbHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  describe('POST /user', () => {
    it('Should return 201 when creating a new user', async () => {
      await request(app)
        .post('/api/user')
        .send({
          name: 'Deivid',
          lastname: 'Novaes',
          nickname: 'sdadsad',
          address: 'London EC3N 4AB, Reino Unido',
          biography: 'A Back-End Developer :)'
        })
        .expect(201)
    })
  })
})
