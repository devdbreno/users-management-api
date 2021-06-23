import { MongoMemoryServer } from 'mongodb-memory-server'

import MongodbHelper from '@infra/db/mongodb/mongodb-helper'

const mongodbSut = {
  mongodbHelper: new MongodbHelper(),
  mongodbMemoryServer: new MongoMemoryServer()
}

describe('Mongodb Helper', () => {
  beforeAll(async () => {
    const mongodbUri = await mongodbSut.mongodbMemoryServer.getUri()
    await mongodbSut.mongodbHelper.connect(mongodbUri)
  })

  afterAll(async () => {
    await mongodbSut.mongodbHelper.disconnect()
  })

  it('Should reconnect if mongodb is down.', async () => {
    let userCollection = await mongodbSut.mongodbHelper.getCollection('users')
    expect(userCollection).toBeTruthy()

    await mongodbSut.mongodbHelper.disconnect()

    userCollection = await mongodbSut.mongodbHelper.getCollection('users')
    expect(userCollection).toBeTruthy()
  })
})
