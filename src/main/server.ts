import './config/dotenv'
import './config/module-alias'

import { MONGO_URL, PORT } from '@main/config/env'
import { MongodbHelper } from '@infra/db/mongodb/mongodb-helper'

MongodbHelper.connect(MONGO_URL)
  .then(async () => {
    const { default: app } = await import('@main/config/app')
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
  })
  .catch(console.error)
