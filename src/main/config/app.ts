import express from 'express'

import initRoutes from '@main/config/routes'
import initMiddlewares from '@main/config/middlewares'

export type anyObjectData = Record<string, unknown>

const app = express()

initMiddlewares(app)
initRoutes(app)

export default app
