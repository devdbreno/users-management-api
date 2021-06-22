import { MongoClient, Collection } from 'mongodb'

type anyObjectData = Record<string, unknown>

export default class MongodbHelper {
  private mongodbUri!: string
  private mongodbClient!: MongoClient

  public async connect(uri: string): Promise<void> {
    this.mongodbUri = uri
    this.mongodbClient = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  public async disconnect(): Promise<void> {
    await this.mongodbClient?.close()
  }

  async getCollection(collectionName: string): Promise<Collection> {
    if (!this.mongodbClient.isConnected()) await this.connect(this.mongodbUri)
    return this.mongodbClient.db().collection(collectionName)
  }

  static map(data: anyObjectData): anyObjectData {
    return { ...data, id: data._id }
  }

  static mapCollection(collection: anyObjectData[]): anyObjectData[] {
    return collection.map((c) => MongodbHelper.map(c))
  }
}
