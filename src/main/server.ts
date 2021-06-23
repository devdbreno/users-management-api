import './config/module-alias'

import env from '@main/config/env'
import MongodbHelper from '@infra/db/mongodb/mongodb-helper'

export const mongodbHelper = new MongodbHelper()

async function bootstrap() {
  await mongodbHelper.connect(env.MONGO_URI)
  const { default: app } = await import('@main/config/app')

  if (process.env.NODE_ENV !== 'test') {
    app.listen(env.PORT, () => {
      console.log(`Server running at http://localhost:${env.PORT}`)
    })
  }
}

bootstrap().catch(console.error)
