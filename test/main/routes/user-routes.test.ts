import request from 'supertest'
import { Collection } from 'mongodb'
import { MongoMemoryServer } from 'mongodb-memory-server'

import app from '@main/config/app'
import { mongodbHelper } from '@main/server'

let userCollection: Collection

describe('User Routes', () => {
  beforeAll(async () => {
    const mongodbUri = await new MongoMemoryServer().getUri()
    await mongodbHelper.connect(mongodbUri)
  })

  afterAll(async () => {
    await mongodbHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = await mongodbHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  describe('POST /user', () => {
    const userDataRequest = {
      name: 'Deivid',
      lastname: 'Novaes',
      nickname: 'devdbreno',
      address: 'London EC3N 4AB, Reino Unido',
      biography: 'A Back-End Developer :)'
    }

    it(`Should return 201 'Created' when creating a user`, async () => {
      const response = await request(app).post('/api/user').send(userDataRequest)
      const userNicknameRes: string = response.body.nickname

      const { nickname: userNicknameDb } = await userCollection.findOne(
        { nickname: userNicknameRes },
        { projection: { nickname: 1, _id: 0 } }
      )

      expect(userNicknameDb).toEqual(userNicknameRes)
    })

    // it(`Should return 409 'Conflict' when creating a user with nickname already in use`, async () => {
    // await userCollection.insertOne(addUserData)

    //   const { body } = await request(app).post('/api/user').send(addUserData).expect(404)

    //   expect(body).toEqual({
    //     message: `'Nickname '${addUserData.nickname}' is already in use'`
    //   })
    // })
  })
})
