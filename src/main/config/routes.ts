import { readdir } from 'fs/promises'

import { Express, Router } from 'express'

const router = Router()

export default async (app: Express): Promise<void> => {
  const routesDir = await readdir(`${__dirname}/../routes`)

  app.use('/api', router)

  routesDir.map(async (routeFile) => {
    if (!routeFile.endsWith('.map')) {
      const { default: setupRoute } = await import(`../routes/${routeFile}`)
      setupRoute(router)
    }
  })
}
