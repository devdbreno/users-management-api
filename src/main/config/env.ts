import { resolve } from 'path'
import { config } from 'dotenv'

const rootDir = resolve(__dirname, '../../..')

let path: string

switch (process.env.NODE_ENV) {
  case 'test':
    path = `${rootDir}/.env.test`
    break

  case 'production':
    path = `${rootDir}/.env.production`
    break

  default:
    path = `${rootDir}/.env.development`
    break
}

config({ path })

export const PORT = +(process.env.PORT ?? 9090)
export const NODE_ENV = process.env.NODE_ENV ?? 'development'
export const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://localhost:27017/hivelabs-backend-test'
