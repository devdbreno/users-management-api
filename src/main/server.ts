import './config/module-alias'

import { MongodbHelper } from '@infra/db'
import { PORT, MONGO_URL } from '@main/config/env'

MongodbHelper.connect(MONGO_URL)
  .then(async () => {
    const { default: app } = await import('@main/config/app')
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
  })
  .catch(console.error)
