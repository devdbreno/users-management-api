import { config } from 'dotenv'

import { rootDir } from './module-alias'

switch (process.env.NODE_ENV) {
  case 'test':
    config({ path: `${rootDir}/.env.test` })
    break

  case 'production':
    config({ path: `${rootDir}/.env.production` })
    break

  default:
    config({ path: `${rootDir}/.env.development` })
    break
}
