import { FilterQuery } from 'mongodb'

import { UserModel } from '@domain/models'

import { MongodbHelper } from '@infra/db'
import { NicknameInUseError } from '@presentation/errors'
import { AddUserRepository, LoadUsersRepository } from '@data/protocols'

type OmittedUserID = Omit<UserModel, 'id'>

export class UserMongoRepository implements AddUserRepository, LoadUsersRepository {
  public async add(data: AddUserRepository.Params): Promise<AddUserRepository.Result> {
    const timestamp = new Date()
    const userCollection = await MongodbHelper.getCollection<OmittedUserID>('users')

    console.log('AddUserRepository', data)

    const exists = await userCollection.findOne({ nickname: data.nickname }, { projection: { _id: 1 } })
    if (exists) return new NicknameInUseError()

    const result = await userCollection.insertOne({ ...data, createdAt: timestamp, updatedAt: timestamp })

    return MongodbHelper.map(result.ops[0])
  }

  public async load(name?: string, lastname?: string): Promise<LoadUsersRepository.Result> {
    const query: FilterQuery<UserModel> = {}
    const userCollection = await MongodbHelper.getCollection<UserModel>('users')

    console.log('LoadUsersRepository', { name, lastname })

    if (name && lastname) query.$and = [{ name: new RegExp(name, 'gi'), lastname: new RegExp(lastname, 'gi') }]
    else if (name) query.name = new RegExp(name, 'gi')
    else if (lastname) query.lastname = new RegExp(lastname, 'gi')

    return userCollection.find(query).toArray()
  }
}
