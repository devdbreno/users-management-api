import { UserModel } from '@domain/models'
import { MONGO_URL } from '@main/config/env'
import { MongodbHelper } from '@infra/db/mongodb'

describe('Mongodb Helper', () => {
  beforeAll(async () => {
    await MongodbHelper.connect(MONGO_URL)
  })

  afterAll(async () => {
    await MongodbHelper.disconnect()
  })

  it('Should reconnect if Mongodb client is down', async () => {
    let userCollection = await MongodbHelper.getCollection<UserModel>('users')
    expect(userCollection).toBeTruthy()

    await MongodbHelper.disconnect()

    userCollection = await MongodbHelper.getCollection<UserModel>('users')
    expect(userCollection).toBeTruthy()
  })
})
