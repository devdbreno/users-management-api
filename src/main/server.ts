import './config/module-alias'

import env from '@main/config/env'

async function bootstrap() {
  const { default: app } = await import('@main/config/app')

  app.listen(env.PORT, () => {
    console.log(`➡️ Server running at http://localhost:${env.PORT}`)
  })
}

bootstrap().catch(console.error)
