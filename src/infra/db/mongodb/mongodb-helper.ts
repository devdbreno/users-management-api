import { MongoClient, Collection } from 'mongodb'

import { anyData } from '@main/config/app'

let mongodbUri: string
let mongodbClient: MongoClient

export const MongodbHelper = {
  async connect(uri: string): Promise<void> {
    mongodbUri = uri
    mongodbClient = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  },

  async disconnect(): Promise<void> {
    await mongodbClient.close()
  },

  async getCollection(name: string): Promise<Collection> {
    if (!mongodbClient.isConnected()) await this.connect(mongodbUri)
    return mongodbClient.db().collection(name)
  },

  map: ({ _id, ...rest }: anyData): anyData => ({ id: _id, ...rest }),
  mapCollection: (collec: anyData[]): anyData[] => collec.map((c) => MongodbHelper.map(c))
}
