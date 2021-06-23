import express from 'express'

import initRoutes from '@main/config/routes'
import initMiddlewares from '@main/config/middlewares'

export type anyData = Record<string, unknown>

const app = express()

initMiddlewares(app)
initRoutes(app)

export default app
