import { MongoMemoryServer } from 'mongodb-memory-server'

import MongodbHelper from '@infra/db/mongodb/mongodb-helper'

const sut = {
  mongodbHelper: new MongodbHelper(),
  mongodbMemoryServer: new MongoMemoryServer()
}

describe('Mongodb Helper', () => {
  beforeAll(async () => {
    const mongodbUri = await sut.mongodbMemoryServer.getUri()
    await sut.mongodbHelper.connect(mongodbUri)
  })

  afterAll(async () => {
    await sut.mongodbHelper.disconnect()
  })

  it('Should reconnect if mongodb is down.', async () => {
    let userCollection = await sut.mongodbHelper.getCollection('users')
    expect(userCollection).toBeTruthy()

    await sut.mongodbHelper.disconnect()

    userCollection = await sut.mongodbHelper.getCollection('users')
    expect(userCollection).toBeTruthy()
  })
})
