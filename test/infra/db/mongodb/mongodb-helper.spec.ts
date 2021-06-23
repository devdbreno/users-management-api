import { MongoMemoryServer } from 'mongodb-memory-server'

import { mongodbHelper } from '@main/server'

describe('Mongodb Helper', () => {
  beforeAll(async () => {
    const mongodbUri = await new MongoMemoryServer().getUri()
    await mongodbHelper.connect(mongodbUri)
  })

  afterAll(async () => {
    await mongodbHelper.disconnect()
  })

  it('Should reconnect if mongodb is down.', async () => {
    let userCollection = await mongodbHelper.getCollection('users')
    expect(userCollection).toBeTruthy()

    await mongodbHelper.disconnect()

    userCollection = await mongodbHelper.getCollection('users')
    expect(userCollection).toBeTruthy()
  })
})
