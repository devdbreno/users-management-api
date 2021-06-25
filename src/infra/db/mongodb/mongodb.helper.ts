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

  async getCollection<TSchema>(name: string): Promise<Collection<TSchema>> {
    if (!mongodbClient.isConnected()) await this.connect(mongodbUri)
    return mongodbClient.db().collection<TSchema>(name)
  },

  map: <TSchema>({ _id, ...rest }: anyData): TSchema => ({ id: _id, ...rest } as unknown as TSchema),

  mapCollection: (collec: anyData[]): anyData[] => collec.map((c) => MongodbHelper.map(c))
}
